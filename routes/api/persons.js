const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Person = require("../../models/PersonModel");

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    res.json(person);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("type", "Type is required")
      .not()
      .isEmpty(),
    check("favourite", "Favourite is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { name, type, favourite } = req.body;

    const newPerson = new Person({
      name: name,
      type: type,
      favourite: favourite
    });

    try {
      const person = await newPerson.save();
      res.json(person);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.put("/:id", async (req, res) => {
  const { name, type, favourite } = req.body;
  const updatedPerson = {};
  if (name) updatedPerson.name = name;
  if (type) updatedPerson.type = type;
  if (favourite) updatedPerson.favourite = favourite;

  try {
    let person = Person.findById(req.params.id);
    if (!person) {
      return res.status(404).send(`Person not found with id${req.params.id}`);
    }
    person = await Person.findByIdAndUpdate(req.params.id, { $set: updatedPerson }, { new: true });
    res.json(person);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let person = Person.findById(req.params.id);
    if (!person) {
      return res.status(400).send(`Person not found with id${req.params.id}`);
    }
    await Person.findByIdAndDelete(req.params.id);
    res.json({ msg: "Person Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
