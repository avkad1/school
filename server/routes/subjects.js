const express = require("express");
let router = express.Router();

const mongo = require("../db/mongo");
const DB = "school";
const SUBJECTS_COLLECTION = "subjects";

router.get("/all", async (req, res) => {
  try {
    const subjects = await mongo.get(DB, SUBJECTS_COLLECTION, {});
    res.send(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
