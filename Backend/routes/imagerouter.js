const express = require("express");
const auth = require("../middlware/auth");
const router = express.Router();
const imagecontroller = require("../Controller/imagecontroller");

router.post("/addimage", auth, imagecontroller.addimage);
router.get("/getallimage", auth, imagecontroller.getallimage);

module.exports = router;
