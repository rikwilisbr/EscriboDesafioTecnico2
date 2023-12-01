const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// schemas
const User = require('../schemas/userSchema')

class AuthController {
  // register/singUp method
  async singUp (req, res) {
    try {
      if (!req.body.senha || !req.body.telefones || !req.body.email || !req.body.nome) {
        return res.status(400).json({
          mensagem: 'bad request'
        })
      }
      const hashedPassword = await bcrypt.hash(req.body.senha, 10)

      const newUser = new User({
        nome: req.body.nome?.trim(),
        email: req.body.email?.trim(),
        telefones: req.body?.telefones,
        senha: req.body.senha ? hashedPassword : null
      })

      if (newUser.nome && newUser.email && newUser.telefones && newUser.senha !== null) {
        const result = await User.create(newUser)

        const id = result.id
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1800s' }) // expires in 30 min

        // send data to client
        const payload = {
          id,
          data_criacao: result.createdAt,
          data_atualizacao: result.updatedAt,
          ultimo_login: result.ultimo_login,
          token
        }

        res.status(201).json(payload)
      } else {
        res.status(400).json({
          mensagem: 'bad request'
        })
      }
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({
          mensagem: 'E-mail já existente'
        })
      } else {
        res.status(500).json({
          mensagem: 'Erro interno do servidor'
        })
        console.error(err)
      }
    }
  }

  // login/singIn method
  async singIn (req, res) {
    try {
      const email = req.body.email
      const password = req.body.senha

      if (!email || !password) {
        return res.status(400).json({ mensagem: 'bad request' })
      }

      const foundUser = await User.findOne({ email })

      if (!foundUser) {
        return res.status(401).json({
          mensagem: 'Usuário e/ou senha inválidos'
        })
      }

      const passwordMatch = await bcrypt.compare(password, foundUser.senha)

      if (passwordMatch) {
        const id = foundUser.id
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1800s' }) // expires in 30 min

        // update user
        foundUser.ultimo_login = Date.now()
        await foundUser.save()

        const payload = {
          id,
          data_criacao: foundUser.createdAt,
          data_atualizacao: foundUser.updatedAt,
          ultimo_login: foundUser.ultimo_login,
          token
        }

        res.json(payload)
      } else {
        res.status(401).json({
          mensagem: 'Usuário e/ou senha inválidos'
        })
      }
    } catch (err) {
      console.error(err)
      return res.status(400).json({
        mensagem: 'bad request'
      })
    }
  }
}

module.exports = new AuthController()
