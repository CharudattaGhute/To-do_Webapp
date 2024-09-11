const mongoose = require("mongoose");
const prioritymodel = require("../Module/Priority");

async function addpriority(req, res) {
  console.log(req.body);
  const userid = req.user._id;
  const { priority } = req.body;

  if (!["Extreme", "Moderate", "Low"].includes(priority)) {
    return res.status(400).send({ message: "Invalid priority value" });
  }

  try {
    const existingpriority = await prioritymodel.findOne({ priority });
    if (existingpriority) {
      return res.status(400).send({ message: "Priority Already Exists" });
    } else {
      const newpriority = new prioritymodel({
        priority,
        createdBy: userid,
        createdAt: Date.now(),
      });
      await newpriority.save();
      res.status(201).send({ message: "Priority Added Successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// *********prioritybyid*******************
async function getprioritybyid(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const priority = await prioritymodel.findById(id);
    console.log(id);
    if (!priority) {
      res.status(404).send({ msg: "priority id is not found" });
    }
    return res.status(201).send({
      priority: priority.priority,
      createdBy: priority.createdBy,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

// *********getallpriority************
async function getallpriority(req, res) {
  try {
    const priority = await prioritymodel.find();
    res.status(201).send({ priority: priority });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// *********Updatepriority*************

async function updatepriority(req, res) {
  console.log(req.body);
  const { priority, createdBy } = req.body;
  const { id } = req.params;

  try {
    const existingpriority = await prioritymodel.findByIdAndUpdate(id);
    if (!existingpriority) {
      res.status(404).send({ message: "Priority Not Found" });
    }
    existingpriority.priority = priority || existingpriority.priority;
    existingpriority.createdBy = createdBy || existingpriority.createdBy;
    await existingpriority.save();
    res.status(201).send({ message: "Priority Updated Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// ************** Delete Priority ******

async function deletepriority(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const priority = await prioritymodel.findByIdAndDelete(id);
    if (!priority) {
      res.status(404).send({ message: "priority Not Found" });
    }
    res.status(201).send({ message: "priority Deleted Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addpriority,
  getprioritybyid,
  getallpriority,
  updatepriority,
  deletepriority,
};
