const database = require("../../config/database.config");
const { genSaltSync, hashSync } = require("bcryptjs");

const createUsers = async (req, res) => {
  const { user_name, email, password, image } = req.body;

  /**
   * ! Create user account logic
   * TODO: Registration validation
   * TODO: Delete user account
   * TODO: Update user
   */

  // Create user logic
  database.query(
    `INSET INTO users (user_name. email, password) VALUES (?, ?, ?)`,
    [user_name, email.toLowerCase(), password],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          message: "Something went wrong, please try again",
        });
      }

      console.log(data);
    }
  );
};

module.exports = { createUsers };
