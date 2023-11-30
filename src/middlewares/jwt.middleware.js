const jwt = require('jsonwebtoken')
require('dotenv').config()

const middlewareJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Não autorizado' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ mensagem: 'Não autorizado' })
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ mensagem: 'Sessão inválida' })
        } else {
          return res.status(401).json({ mensagem: 'Não autorizado' })
        }
      } else {
        next()
      }
    })
  }
}

module.exports = middlewareJWT
