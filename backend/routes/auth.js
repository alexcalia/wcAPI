const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hat = require('hat');
const {registerValidation, loginValidation} = require('../validation');

const {verifyAccess, verifyRefresh} = require('./verifyToken');

// Register
router.post('/register', async (req, res) => {
  
  //Validation
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  // Check if a user exists in the database
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('An account with that email already exists.');

  // Hash the password
  const salt = await bcrypt.genSalt(16);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create API key
  const key = hat();

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    date: new Date(),
    apikey: key
  });

  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {

  // Check if a user exists in the database
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email or password is wrong');

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Email or password is wrong');

  // Create and assign an access token and refresh token, refresh token saved to DB, access token sent in cookie
  const accessToken = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m"
  });
  const refreshToken = jwt.sign({_id:user._id}, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "120m"
  });
  
  res.cookie('jwt', accessToken, {httpOnly: true});
  res.cookie('rjwt', refreshToken, {httpOnly: true});
  res.send(user.apikey);
});

router.get('/account', verifyAccess, async (req, res) => {
  const user = await User.findOne({_id: req.user._id});
  res.status(200).send(user);
});

router.get('/refresh_token', verifyRefresh, async (req, res) => {
   // Create and assign an access token and refresh token, refresh token saved to DB, access token sent in cookie
  const accessToken = jwt.sign({_id:req.user._id}, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m"
  });
  const refreshToken = jwt.sign({_id:req.user._id}, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "120m"
  });

});

module.exports = router;