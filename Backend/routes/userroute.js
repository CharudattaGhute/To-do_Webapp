const express = require("express");

const usercontroller = require("../Controller/usercontroller");
const auth = require("../middlware/auth");

const router = express.Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/userinfo", auth, usercontroller.userinfo);

module.exports = router;
