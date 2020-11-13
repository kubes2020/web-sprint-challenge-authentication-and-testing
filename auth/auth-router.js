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
  const { password, username } = req.body

  if(username && password) {
    Users.findBy({ username })
    .then(([user]) => {
      console.log('user!!!', user)
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user)
        res.status(200).json({ message: 'Welcome to our API', token })
      } else {
        res.status(401).json({ message: 'invalid credentials'})
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
  } else {
    res.status(400).json({ message: 'Please provide username and password'})
  }
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '600 seconds',
  }
  return jwt.sign(payload, jwtSecret, options)
}

// when testing in postman don't copy " " when testing the token in authorization tab in headers


module.exports = router;
