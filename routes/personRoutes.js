const express = require("express");
const Person = require("../models/person");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    res.status(200).json(savedPerson);
    console.log("data saved");
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
    console.log("data sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    console.log("worktype", workType);
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched", response);
      res.status(200).send(response);
    } else {
      console.log("in else");
      res.status(404).json({ message: "Invalid parameter." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const data = await Person.findByIdAndDelete(personId);
    if (!data) {
      return res.status(404).json({ message: "No record found with given id" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server" });
  }
});

module.exports = router;
