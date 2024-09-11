const express = require("express");

const usercontroller = require("../Controller/usercontroller");

const router = express.Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);

module.exports = router;
