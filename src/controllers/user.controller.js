const User = require('../schemas/userSchema')
const { isValidObjectId } = require('mongoose')

class UserController {
  async getUser (req, res) {
    const userID = req.params.userID
    try {
      if (!isValidObjectId(userID)) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' })
      }

      const foundUser = await User.findOne({ _id: userID }).lean()
      if (foundUser) {
        const payload = {
          id: foundUser.id,
          email: foundUser.email,
          nome: foundUser.nome,
          telefones: foundUser.telefones,
          ultimo_login: foundUser.ultimo_login,
          data_criacao: foundUser.createdAt,
          data_atualizacao: foundUser.updatedAt
        }
        res.status(200).json(payload)
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
  }
}

module.exports = new UserController()
