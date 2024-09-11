const mongoose = require("mongoose");
const usermodel = require("../Module/User");
const jwt = require("jsonwebtoken");

// ******* Register ****************
async function register(req, res) {
  console.log(req.body);
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    createdAt,
  } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      const newUser = new usermodel({
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        createdAt: Date.now(),
      });

      await newUser.save();

      res
        .status(201)
        .send({ message: "User registered successfully", success: true });
    } else {
      res.status(400).send({ error: "User already exists", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
}

// ************* Login **************

async function login(req, res) {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await usermodel.findOne({ username });
    if (!user || !(await user.comparepassword(password))) {
      return res.status(400).send({ error: "Invalid username or Password" });
    }
    const token = jwt.sign({ _id: user._id }, "key", {
      expiresIn: "1h",
    });
    res.status(200).send({ user: user, access: token, success: true });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

module.exports = {
  register,
  login,
};
