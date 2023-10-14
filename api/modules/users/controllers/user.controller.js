const { genSaltSync, hashSync } = require("bcryptjs");
const { create, getUserByUserId, getUsers, updateUsers, deleteUser } = require("../services/user.service");

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
  }
}