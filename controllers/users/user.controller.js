const database = require("../../config/database.config");
const { genSaltSync, hashSync } = require("bcryptjs");
const url = require("url");

const tableName = process.env.DB_USERS_TABLE;
const createUser = async (req, res) => {
  const { full_name, user_name, email, password } = req.body;

  database.query(
    `SELECT user_name, email FROM ${tableName} WHERE user_name = ? OR email = ? LIMIT 1`,
    [user_name.toLowerCase(), email.toLowerCase()],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          message: "Something went wrong, please try again",
        });
      }

      if (data) {
        if (password.length < 8) {
          return res.status(400).json({
            error: true,
            message: "Password must be at least 8 characters",
          });
        }

        // validate user
        if (data.user_name === user_name.toLowerCase()) {
          return res.status(400).json({
            error: true,
            message: "Username already taken",
          });
        } else if (data.email === email.toLowerCase()) {
          return res.status(400).json({
            error: true,
            message: "Email address already taken",
          });
        } else {
          const salt = genSaltSync(10);
          const hashPassword = hashSync(password, salt);

          database.query(
            `INSERT INTO ${tableName} (full_name, user_name, email, password) VALUE (?, ?, ?, ?)`,
            [full_name, user_name, email, hashPassword],
            (err) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  error: true,
                  message:
                    "Something went wrong, we could not complete your registration",
                });
              }

              res.status(200).json({
                error: false,
                message: "Account created successfully",
              });
            }
          );
        }
      }
    }
  );
};

// get users
const getUsers = async (req, res) => {
  database.query(`SELECT * FROM ${tableName}`, [], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: "Something went wrong, please try again",
      });
    }

    return res.status(200).json({
      error: false,
      data: data[0],
    });
  });
};

module.exports = { createUser, getUsers };
