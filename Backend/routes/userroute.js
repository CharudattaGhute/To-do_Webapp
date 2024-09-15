const express = require("express");

const usercontroller = require("../Controller/usercontroller");
const auth = require("../middlware/auth");
const upload = require("../middlware/multer");

const router = express.Router();

router.post("/register", upload, usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/userinfo", auth, usercontroller.userinfo);

module.exports = router;
