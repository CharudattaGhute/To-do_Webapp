const express = require("express");
const auth = require("../middlware/auth");
const router = express.Router();
const imagecontroller = require("../Controller/imagecontroller");
const upload = require("../middlware/multer");

router.post("/addimage", auth, upload, imagecontroller.addimage);
router.get("/getallimage", auth, imagecontroller.getallimage);

module.exports = router;
