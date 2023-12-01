const express = require('express')
const bodyParser = require('body-parser')

function CreateServer () {
  const app = express()
  app.use(bodyParser.json())

  // api routes
  app.use('/api/singUp', require('../routes/singUp')) // register/singUp user route
  app.use('/api/singIn', require('../routes/singIn')) // login/singIn user route
  app.use('/api/getUser', require('../routes/getUser')) // search user route
  app.get('/', (req, res) => res.send('Api para desafio técnico Escribo, detalhes sobre endpoints: https://github.com/rikwilisbr/EscriboDesafioTecnico2/blob/main/README.md'))
  return app
}

module.exports = CreateServer
