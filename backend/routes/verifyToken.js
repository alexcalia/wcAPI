const jwt = require('jsonwebtoken');

exports.verifyAccess = function (req, res, next) {
  const token = req.cookies.jwt;
  if(!token) return res.status(401).send('Access denied.');

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token');
  }
}

exports.verifyRefresh = function (req, res, next) {
  const token = req.cookies.rjwt;
  if(!token) return res.status(401).send('Access denied.');

  try {
    const verified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token');
  }
}