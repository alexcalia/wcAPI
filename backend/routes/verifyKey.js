const User = require('../model/User');

module.exports = async function (req, res, next) {
  const key = req.header('apikey');
  if(!key) return res.status(401).send('Access denied.');

  try {
    const userKey = await User.findOne({apikey: key});
    if(!userKey) return res.status(400).send('Invalid key');
    next();
  
  } catch(err) {
    res.status(400).send('Invalid key');
  }
}