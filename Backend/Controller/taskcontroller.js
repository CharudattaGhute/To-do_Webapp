const mongoose = require("mongoose");
const taskmodel = require("../Module/Task");
const prioritymodel = require("../Module/Priority");
const usermodel = require("../Module/User");

// ******** Addproducts*************
const addtask = async (req, res) => {
  console.log(req.body);
  const userid = req.user._id;

  const { title, description, priority, taskDate, status } = req.body;

  const allowedPriorities = ["Extreme", "Moderate", "Low"];

  try {
    if (!allowedPriorities.includes(priority)) {
      return res
        .status(400)
        .send({ msg: "Invalid priority value", success: false });
    }

    const existingtask = await taskmodel.findOne({
      title,
      priority,
    });
    if (existingtask) {
      return res
        .status(400)
        .send({ msg: "Task already exists", success: false });
    }

    const image = req.file ? req.file.filename : null;

    const newtask = new taskmodel({
      title,
      description,
      priority,
      taskDate,
      status,
      image,
      createdBy: userid,
      createdAt: Date.now(),
    });

    await newtask.save();
    res.status(201).send({ msg: "Task created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// *************** Addcollaboraters ***********
const addCollaborator = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { collaboratername, status, createdAt } = req.body;

    const task = await taskmodel.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found", success: false });
    }

    const user = await usermodel.findById(collaboratername);
    if (!user) {
      return res
        .status(404)
        .send({ message: "Collaborator not found", success: false });
    }

    task.collaboraters.push({
      collaboratername,
      status: status || "Not started",
      createdAt: Date.now(),
    });

    await task.save();

    res.status(201).send({
      message: "Collaborator added successfully",
      task,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// *******getalltask***************
async function getTaskById(req, res) {
  try {
    const task = await taskmodel.findById(req.params.taskId);

    if (!task) {
      return res.status(404).send({ error: "Task not found", success: false });
    }

    const modifiedTask = {
      _id: task._id,
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      taskDate: task.taskDate,
      status: task.status,
      image: task.image ? `http://localhost:5001/uploads/${task.image}` : null,
      createdBy: task.createdBy,
      createdAt: task.createdAt,
      collaboraters: task.collaboraters,
    };

    res.status(200).send({ task: modifiedTask, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// ****************getalltask***********
async function getalltask(req, res) {
  try {
    const tasks = await taskmodel.find();

    const modifiedtask = tasks.map((task) => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      taskDate: task.taskDate,
      status: task.status,
      image: task.image ? `http://localhost:5001/uploads/${task.image}` : null,
      createdBy: task.createdBy,
      createdAt: task.createdAt,
      collaboraters: task.collaboraters,
    }));

    res.status(200).send({ modifiedtask, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// ***** updatetask*******
async function updatetask(req, res) {
  console.log(req.body);
  const { id: taskid } = req.params;
  const {
    title,
    description,
    category,
    priority,
    image,
    createdBy,
    collaboraters,
  } = req.body;
  try {
    const task = await taskmodel.findByIdAndUpdate(taskid);
    if (!task) {
      res.status(404).send({ msg: "product id is not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.category = category || task.category;
    task.priority = priority || task.priority;
    task.image = image || task.image;
    task.createdBy = createdBy || task.createdBy;
    task.collaboraters = collaboraters || task.collaboraters;
    await task.save();
    res
      .status(201)
      .send({ message: "Task Updated successfully", success: true });
  } catch (error) {
    res.status(500).send({ error: "Server error", true: false });
  }
}

// **********Delete task **********

async function deletetask(req, res) {
  console.log(req.body);
  const { id: taskid } = req.params;
  try {
    const task = await taskmodel.findByIdAndDelete(taskid);
    if (!task) {
      return res.status(404).send({ msg: "Task id not found", success: false });
    }
    res.status(200).send({ msg: "Task Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).send({ error: "Server Error", success: false });
  }
}

// ********** Getfiltered task **************
const getFilteredTasks = async (req, res) => {
  try {
    const tasks = await taskmodel.find({
      priority: { $in: ["Moderate", "Extreme"] },
    });

    res.status(201).send({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to retrieve tasks",
    });
  }
};

// ************ get only task created by user **********

// Fetch tasks for the logged-in user
const getTasksForUser = async (req, res) => {
  try {
    // Fetch tasks created by the logged-in user
    const tasks = await taskmodel.find({ createdBy: req.user._id });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).send({ tasks });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
};

module.exports = {
  addtask,
  //   ***Addcollbolaters***
  addCollaborator,
  //   *************
  getTaskById,
  getalltask,
  updatetask,
  deletetask,
  getFilteredTasks,
  getTasksForUser,
};
