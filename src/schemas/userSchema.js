const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  senha: { type: String, required: true },
  telefones: [{ numero: { type: String, required: true }, ddd: { type: String, required: true } }],
  ultimo_login: { type: Date, default: Date.now }
}, { timestamps: true })

userSchema.index({ email: 1 }, { unique: true })

// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema)

module.exports = User
