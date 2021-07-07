/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const { jwtSecret } = require('./secrets.js')
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  const token = req.headers.authorization
  console.log('token here', token)
  if(!token) {
    return res.status(401).json({ you: 'shall Not pass!' });
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err){
        return res.status(401).json({message: 'invalid credentials'})
      }
      req.decodedJwt = decoded
      next()
    })


  }
  
};
