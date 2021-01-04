const User = require('../model/User');

module.exports = async function (req, res, next) {
  const key = req.header('apikey');
  if(!key) return res.status(401).send('Access denied.');
  console.log("got the key from header")
  try {
    console.log("trying to find key")
    const userKey = await User.findOne({apikey: key});
    if(!userKey) return res.status(400).send('Invalid key');
    console.log("key validated")
    next();
  
  } catch(err) {
    res.status(400).send('Invalid key');
  }
}