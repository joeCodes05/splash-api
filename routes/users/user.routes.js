const {
  createUser,
  getUsers,
} = require("../../controllers/users/user.controller");
const express = require("express");

const router = express.Router();

router.post("/signup", createUser);
router.get("/", getUsers);

module.exports = router;
