const jwt = require('jsonwebtoken')
require('dotenv').config()

const signJwt = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1800s' })

const expiredSignJwt = (id) => {
  // Set the expiration time to a past date (e.g., 1 second ago)
  const pastDate = new Date()
  pastDate.setSeconds(pastDate.getSeconds() - 1)

  return jwt.sign({ id, exp: Math.floor(pastDate.getTime() / 1000) }, process.env.JWT_SECRET)
}

module.exports = { signJwt, expiredSignJwt }
