const router = require('express').Router();
const { query } = require('express');
const Faction = require('../model/Faction');
const verifyKey = require('./verifyKey');

router.get('/', verifyKey, async (req, res) => {

  try {
    const factions = await Faction.find({});
    res.send(factions);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;