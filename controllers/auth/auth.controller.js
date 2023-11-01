const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const database = require("../../config/database.config");
const { randomUUID } = require("crypto");
const table = "users";

const createUsers = async (req, res) => {
  const { full_name, user_name, email, password } = req.body;
  database.query(
    `SELECT user_name, email FROM ${table} WHERE user_name = ? OR email = ? LIMIT 1`,
    [user_name, email],
    (err, data) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Something went wrong, please try again",
        });
      }

      if (data.length) {
        if (data[0].user_name === user_name) {
          return res.status(409).json({
            error: true,
            message: "Username already taken",
          });
        } else if (data[0].email === email) {
          return res.status(409).json({
            error: true,
            message: "Email address already in use",
          });
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(password, salt);
          const token = randomUUID();
          database.beginTransaction(
            `INSERT INTO ${table} (full_name, user_name, email, password, token) VALUES (?, ?, ?, ?, ?)`,
            [full_name, user_name, email, hashPassword, token],
            (err) => {
              if (err) {
                return res.status(500).json({
                  error: true,
                  message: "Something went wrong, please try again",
                });
              } else {
                const transporter = nodemailer.createTransport({
                  service: "Gmail",
                  auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
                  },
                });

                const html = `
                  <section style="text-align: center; padding: 1rem; background-color: #eeeeee;">
                    <h2>Hi,</h2>
                    <p>You have registered on <a href="http://localhost:3000">Splash</a></p>
                    <p>Please click on this verification link <a href="http://localhost:3000/verify?email=${email}&token=${token}">Click here</a> to complete your registration</p>
                    <small>If you did not initiate this action. Please, ignore the message.</small>
                    <p>Thank you!</p>
                  </section>
                `;

                const mailOptions = {
                  from: process.env.NODEMAILER_EMAIL,
                  to: email,
                  subject: "Account verification message from Splash",
                  html,
                };

                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.error(`Error sending email`, err);
                  } else {
                    if (info.accepted) {
                      console.log(info.messageId);
                      database.commit();
                    } else if (info.rejected) {
                      return res.status(400).json({
                        error: true,
                        message: "Sorry, we could not send your mail",
                      });
                    }
                  }
                });
              }
            }
          );
        }
      }
    }
  );
};

module.exports = { createUsers };
