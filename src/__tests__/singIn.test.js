const supertest = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const CreateServer = require('../utils/server')

const app = CreateServer()

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create()

  await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoose.connection.close()
})

describe('getSingIn', () => {
  describe('get singIn Route', () => {
    describe('success singIn', () => {
      it('should return 200', async () => {
        const fakeUser = {
          nome: 'fakeUser',
          email: 'fake@gmail.com',
          senha: 'fakePass',
          telefones: [
            { numero: '123890653', ddd: '00' },
            { numero: '123456789', ddd: '02' }
          ]
        }

        await supertest(app).post('/api/singUp').send(fakeUser)

        const fakeLoginOptions = {
          email: fakeUser.email,
          senha: fakeUser.senha
        }

        const { statusCode, body } = await supertest(app).post('/api/singIn').send(fakeLoginOptions)

        expect(statusCode).toBe(200)
        expect(body).toStrictEqual({
          id: expect.any(String),
          data_criacao: expect.any(String),
          data_atualizacao: expect.any(String),
          ultimo_login: expect.any(String),
          token: expect.any(String)
        })
      })
    })

    describe('wrong email or pass', () => {
      it('should return 401', async () => {
        const fakeLoginOptions = {
          email: 'fake@gmail.com',
          senha: 'fakePss'
        }

        const { statusCode, body } = await supertest(app).post('/api/singIn').send(fakeLoginOptions)

        expect(statusCode).toBe(401)
        expect(body.mensagem).toEqual('Usuário e/ou senha inválidos')
      })
    })

    describe('some request fileds missing', () => {
      it('should return 400', async () => {
        const fakeLoginOptions = {
          nome: 'fakeUser',
          senha: 'fakePass'
        }

        const { statusCode, body } = await supertest(app).post('/api/singIn').send(fakeLoginOptions)

        expect(statusCode).toBe(400)
        expect(body.mensagem).toEqual('bad request')
      })
    })
  })
})
