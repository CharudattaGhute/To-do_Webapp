const express = require("express");
const auth = require("../middlware/auth");
const invitecontroller = require("../Controller/invitecontroller");
const router = express.Router();

router.post("/invitation", auth, invitecontroller.invitation);

module.exports = router;
