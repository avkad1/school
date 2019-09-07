const express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const mongo = require("../db/mongo");
const DB = "school";
const STUDENTS_COLLECTION = "users";

router.post("/login", async (req, res) => {
  let { emailId, password } = req.body;
  try {
    const students = await mongo.get(DB, STUDENTS_COLLECTION, { emailId });
    if (students.length === 1) {
      if (bcrypt.compareSync(password, students[0].password))
        res
          .status(200)
          .send({
            message: "User successfully authenticated.",
            student: _.omit(students[0], "password")
          });
      else res.status(403).send({ message: "Invalid credentials." });
    } else {
      res.status(409).send({ message: "No such user exists." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
