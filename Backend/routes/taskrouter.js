const express = require("express");
const auth = require("../middlware/auth");
const taskcontroller = require("../Controller/taskcontroller");
const router = express.Router();
const upload = require("../middlware/multer");

router.post("/addtask", auth, upload.single("image"), taskcontroller.addtask);
router.post("/addCollaborator/:id", auth, taskcontroller.addCollaborator);
router.get("/gettaskbyid/:id", auth, taskcontroller.gettaskbyid);
router.get("/getalltask", auth, taskcontroller.getalltask);
router.put("/updatetask/:id", auth, taskcontroller.updatetask);
router.delete("/deletetask/:id", auth, taskcontroller.deletetask);

module.exports = router;
