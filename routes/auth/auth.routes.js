const { createUsers } = require("../../controllers/auth/auth.controller");
const express = require("express");

const router = express.Router();

router.post("/signup", createUsers);

module.exports = router;
