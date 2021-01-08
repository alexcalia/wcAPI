const router = require('express').Router();
const Races = require('../model/Races');
const verifyKey = require('./verifyKey');

router.get('/', verifyKey, async (req, res) => {

  try {
    const races = await Races.find({});
    res.send(races);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;