const router = require('express').Router();
const path = require('path');
const { response } = require('express');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'index.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'register.html'));
})
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'login.html'));
})
router.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'account.html'));
})

module.exports = router;