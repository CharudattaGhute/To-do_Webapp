const express = require("express");
const auth = require("../middlware/auth");
const prioritycontroller = require("../Controller/prioritycontroller");
const router = express.Router();

router.post("/addpriority", auth, prioritycontroller.addpriority);
router.get("/getprioritybyid/:id", auth, prioritycontroller.getprioritybyid);
router.get("/getallpriority", auth, prioritycontroller.getallpriority);
router.put("/updatepriority/:id", auth, prioritycontroller.updatepriority);
router.delete("/deletepriority/:id", auth, prioritycontroller.deletepriority);

module.exports = router;
