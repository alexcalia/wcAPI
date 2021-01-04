const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hat = require('hat');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {

  // Validation
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  // Check if a user exists in the database
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(process.env.SALT_SECRET);
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
  // Validation 
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Check if a user exists in the database
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email or password is wrong');

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Email or password is wrong');

  // Create and assign a token
  const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});


module.exports = router;