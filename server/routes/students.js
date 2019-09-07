const express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
var { ObjectId } = require("mongodb");

const mongo = require("../db/mongo");
const DB = "school";
const STUDENTS_COLLECTION = "users";
const BCRYPT_SALT_ROUNDS = 12;

router.get("/all", async (req, res) => {
  try {
    const students = await mongo.get(DB, STUDENTS_COLLECTION, {
      isAdmin: { $ne: true }
    });
    res.send(students);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/new", async (req, res) => {
  try {
    let { emailId, name, semester, password } = req.body;
    const existing = await mongo.get(DB, STUDENTS_COLLECTION, { emailId });
    if (existing.length > 0) {
      res.status(409).send({ message: "Student already exists." });
    } else {
      let hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
      const student = await mongo.insert(DB, STUDENTS_COLLECTION, {
        emailId,
        name,
        semester,
        password: hashedPassword,
        subjects: []
      });
      res.status(201).send({
        message: "Student created successfully",
        student: student.ops[0]
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    await mongo.update(
      DB,
      STUDENTS_COLLECTION,
      { _id: ObjectId(req.params.id) },
      req.body
    );
    const updatedRecord = await mongo.get(DB, STUDENTS_COLLECTION, {
      _id: ObjectId(req.params.id)
    });
    res.send(updatedRecord[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
module.exports = router;
