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

describe('getSingUp', () => {
  describe('get singUp Route', () => {
    describe('success singUp', () => {
      it('should return 201', async () => {
        const fakeUser = {
          nome: 'fakeUser',
          email: 'fake@gmail.com',
          senha: 'fakePass',
          telefones: [
            { numero: '123890653', ddd: '00' },
            { numero: '123456789', ddd: '02' }
          ]
        }
        const { statusCode, body } = await supertest(app).post('/api/singUp').send(fakeUser)

        expect(statusCode).toBe(201)
        expect(body).toStrictEqual({
          id: expect.any(String),
          data_criacao: expect.any(String),
          data_atualizacao: expect.any(String),
          ultimo_login: expect.any(String),
          token: expect.any(String)
        })
      })
    })

    describe('email already in use', () => {
      it('should return 400', async () => {
        const fakeUserInput = {
          nome: 'fakeUser',
          email: 'fake@gmail.com',
          senha: 'fakePass',
          telefones: [
            { numero: '123890653', ddd: '00' },
            { numero: '123456789', ddd: '02' }
          ]
        }

        const { statusCode, body } = await supertest(app).post('/api/singUp').send(fakeUserInput)

        expect(statusCode).toBe(400)
        expect(body.mensagem).toEqual('E-mail já existente')
      })
    })

    describe('some request fileds missing', () => {
      it('should return 400', async () => {
        const fakeUserInput = {
          nome: 'fakeUser',
          senha: 'fakePass',
          telefones: [
            { numero: '123890653', ddd: '00' },
            { numero: '123456789', ddd: '02' }
          ]
        }

        const { statusCode, body } = await supertest(app).post('/api/singUp').send(fakeUserInput)

        expect(statusCode).toBe(400)
        expect(body.mensagem).toEqual('bad request')
      })
    })
  })
})
