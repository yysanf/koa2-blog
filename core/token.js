const jwt = require('jsonwebtoken')
const security = require('../config/config').security

const generateToken = function(uid, scope) {
  const secretKey = security.secretKey
  const expiresIn = security.expiresIn
  const token = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn,
    }
  )
  return token
}

const verifyToken = function(token) {
  try {
    const secretKey = security.secretKey
    return jwt.verify(token, secretKey)
  } catch (err) {
    throw new global.errs.Forbidden()
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
