const express = require("express");
const auth = require("../middlware/auth");
const categorycontroller = require("../Controller/categorycontroller");
const router = express.Router();

router.post("/addcategory", auth, categorycontroller.addcategory);
router.get("/getcategorybyid/:id", auth, categorycontroller.getcategorybyid);
router.get("/getallcategory", auth, categorycontroller.getallcategory);
router.put("/updatecategory/:id", auth, categorycontroller.updatecategory);
router.delete("/deletecategory/:id", auth, categorycontroller.deletecategory);

module.exports = router;
