const { createUsers } = require("../../controllers/users/user.controller");
const express = require("express");

const router = express.Router();

router.post("/signup", createUsers);

module.exports = router;
