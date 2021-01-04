const router = require('express').Router();
const { query } = require('express');
const Classes = require('../model/Classes');
const verifyKey = require('./verifyKey');

router.get('/', verifyKey, async (req, res) => {
  console.log("getting classes")
  try {
    const classes = await Classes.find({});
    console.log("found classes")
    res.send(classes);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;