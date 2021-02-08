const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.jwt;
  if(!token) return res.status(401).send('Access denied.');

  try {
    console.log(token)
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(verified);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token');
  }
}