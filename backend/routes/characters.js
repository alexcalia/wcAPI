const router = require('express').Router();
const Character = require('../model/Character');
const verifyKey = require('./verifyKey');


router.get('/', verifyKey, async (req, res) => {
  
  // Queries
  const factionId = req.query.faction;
  const classId = req.query.class;
  const raceId = req.query.race;
  const limit = parseInt(req.query.limit);
  const cursor = req.query.cursor;
  let character;
  let payload;

  try {
    if(factionId && classId && raceId) {
      // Find by class, race and faction
      payload = await Character.find({$and: [{'faction.id': factionId}, {'class.id': classId}, {'race.id': raceId}]});
    } else if (factionId && classId) {
      // Find by faction and class
      payload = await Character.find({$and: [{'faction.id': factionId}, {'class.id': classId}]});
    } else if (classId && raceId) {
      // Find by class and race
      payload = await Character.find({$and: [{'race.id': raceId}, {'class.id': classId}]});
    } else if (factionId && raceId) {
      // Find by faction and race
      payload = await Character.find({$and: [{'race.id': raceId}, {'faction.id': factionId}]});
    } else if (factionId || classId || raceId) {
      // Find by faction, or race, or class
      payload = await Character.find({$or: [{'faction.id': factionId}, {'class.id': classId}, {'race.id': raceId}]});
    } else if (cursor) {
      //Find all characters from cursor (pagination)
      const decoded = parseInt(Buffer.from(cursor, 'base64').toString('binary'));
      console.log(decoded);
      character = await Character.find({id: { $gt: decoded}}).limit(limit ? limit : 4);
    } else if (Object.keys(req.query).length === 0) {
      // Find all chaarcters
      character = await Character.find({}).limit(limit ? limit : 4);
      const encodedPrev = Buffer.from(character[0].id.toString(), 'binary').toString('base64');
      const nextCursor = character[character.length-1].id + 1
      const encodedNext = Buffer.from(nextCursor.toString(), 'binary').toString('base64');
      
      payload = {
        data: character, 
        cursor: {
          previous: encodedPrev,
          next: encodedNext
        }}
    } else {
      res.status(400).send('Invalid query');
    }

    res.send(payload);
  } catch (err) {
    res.status(400).send(err);
  }
  
});

module.exports = router;