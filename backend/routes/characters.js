const router = require('express').Router();
const Character = require('../model/Character');
const verifyKey = require('./verifyKey');


router.get('/', verifyKey, async (req, res) => {
  
  // Queries
  const factionId = req.query.faction;
  const classId = req.query.class;
  const raceId = req.query.race;
  const limit = parseInt(req.query.limit);
  const cursor = req.query.cursor
  let character;
  let payload;

  try {
    if(factionId && classId && raceId) {
      // Find by class, race and faction
      character = await Character.find({$and: [{'faction.id': factionId}, {'class.id': classId}, {'race.id': raceId}]});
    } else if (factionId && classId) {
      // Find by faction and class
      character = await Character.find({$and: [{'faction.id': factionId}, {'class.id': classId}]});
    } else if (classId && raceId) {
      // Find by class and race
      character = await Character.find({$and: [{'race.id': raceId}, {'class.id': classId}]});
    } else if (factionId && raceId) {
      // Find by faction and race
      character = await Character.find({$and: [{'race.id': raceId}, {'faction.id': factionId}]});
    } else if (factionId || classId || raceId) {
      // Find by faction, or race, or class
      character = await Character.find({$or: [{'faction.id': factionId}, {'class.id': classId}, {'race.id': raceId}]})
    } else {
      // Find all chaarcters
      character = await Character.find({}).limit(limit ? limit : 4);
    }

    res.send(character);
  } catch (err) {
    res.status(400).send(err);
  }
  
});

module.exports = router;