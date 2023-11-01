const { createUsers } = require("../../controllers/auth/auth.controller.js");
const express = require("express");

const router = express.Router();

router.post("/signup", createUsers);

module.exports = router;
