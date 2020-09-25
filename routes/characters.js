const router = require('express').Router();
const { query } = require('express');
const Character = require('../model/Character');
const verifyKey = require('./verifyKey');


router.get('/', verifyKey, async (req, res) => {
  
  // Queries
  const factionId = req.query.faction;
  const classId = req.query.class;
  const raceId = req.query.race;
  let character;

  try {
    if(factionId && classId && raceId) {
      // Find by class, race and faction
      character = await Character.find({$and: [{'faction.id': factionId}, {'class.id': classId}, {'race': raceId}]});
    } else if (factionId && classId) {
      // Find by faction and class
      character = await Character.find({$and: [{'faction.id': factionId}, {'class.id': classId}]});
    } else if (classId && raceId) {
      // Find by class and race
      character = await Character.find({$and: [{'race': raceId}, {'class.id': classId}]});
    }else if (factionId && raceId) {
      // Find by faction and race
      character = await Character.find({$and: [{'race': raceId}, {'faction.id': factionId}]});
    } else if (factionId) {
      // Find by faction
      character = await Character.find({'faction.id': factionId});
    } else if (raceId) {
      // Find by race
      character = await Character.find({'race': raceId});
    } else if (classId) {
      // Find by class
      character = await Character.find({'class.id': classId});
    } else {
      // Find all chaarcters
      character = await Character.find({})
    }

    res.send(character);
  } catch (err) {
    res.status(400).senmd(err);
  }
  
});

module.exports = router;