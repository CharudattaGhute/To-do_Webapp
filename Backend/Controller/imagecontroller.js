const mongoose = require("mongoose");
const imagemodel = require("../Module/image");

async function addimage(req, res) {
  console.log(req.body);
  const userid = req.user._id;
  const { image } = req.body;

  try {
    const newImage = await imagemodel.create({
      userid,
      image,
    });

    res
      .status(201)
      .send({ message: "Image Added Successfully", image: newImage });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getallimage(req, res) {
  try {
    const image = await imagemodel.find();
    res.status(201).send({ image: image });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addimage,
  getallimage,
};
