const bcrypt = require("bcryptjs");
const url = require("url");
const jwt = require("jsonwebtoken");
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
            [full_name, user_name, email, password, token],
            (err) => {
              if (err) {
                return res.status(500).json({
                  error: true,
                  message: "Something went wrong, please try again",
                });
              } else {
                const mailer = nodemailer.createTransport({
                  host,
                });
              }
            }
          );
        }
      }
    }
  );
};
