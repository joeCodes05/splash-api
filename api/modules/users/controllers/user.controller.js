const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { create, getUserByUserId, getUsers, updateUsers, deleteUser, getUserByEmail } = require("../services/user.service");
const { sign } = require('jsonwebtoken')

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Databse connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: result
      });
    });
  },

  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if(!result) {
        return res.json({
          success: 0,
          message: "User not found"
        })
      }
      return res.json({
        success: 1,
        data: result
      })
    })
  },

  getUsers: (req, res) => {
    getUsers((err, result) => {
      if(err) {
        return console.log(err);
      }
      return res.json({
        success: 1,
        data: result
      });
    });
  },

  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    updateUsers(body, (err, result) => {
      if(err) {
        return console.log(err);
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },

  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data.id, (err, result) => {
      if(err) {
        return console.log(err);
      }
      if(!result) {
        return res.json({
          success: 0,
          message: "user not found"
        })
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      })
    })
  },

  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, result) => {
      if(err) {
        return console.log(err);
      }
      if(!result) {
        return res.json({
          success: 0,
          message: "Email address not found"
        });
      }
      const results = compareSync(body.password, result.password);
      if(result) {
        results.password = undefined;
        const jsonToken = sign({result: results}, process.env.SECRET_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          token: jsonToken
        })
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password"
        })
      }
    })
  }
}