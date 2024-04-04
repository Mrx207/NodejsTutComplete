const express = require("express");
const MenuItem = require("../models/menu");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menu = new MenuItem(data);
    const savedMenu = await menu.save();
    res.status(200).json(savedMenu);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    console.log(tasteType);
    const data = await MenuItem.find({ taste: tasteType });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;
