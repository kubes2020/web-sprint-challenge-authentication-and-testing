const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secrets.js')
const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
  const credentials = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(credentials.password, rounds)
  credentials.password = hash

  //save user to database
  Users.add(credentials)
  .then(user => {
    res.status(200).json({ data: user})
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
