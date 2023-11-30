const supertest = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const CreateServer = require('../utils/server')
const { signJwt, expiredSignJwt } = require('../utils/signJwt')

const app = CreateServer()

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create()

  await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
  await mongoose.connection.dropDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoose.connection.close()
})

describe('getUser', () => {
  describe('get getUser route', () => {
    describe('success auth and found user', () => {
      it('should return 200', async () => {
        const fakeUserInput = {
          email: 'fakeuser@example.com',
          nome: 'Fake User',
          telefones: [{ numero: '123456789', ddd: '11' }]
        }

        const insertResult = await mongoose.connection.collection('users').insertOne(fakeUserInput)
        const authToken = await signJwt(insertResult.insertedId)

        const { statusCode } = await supertest(app).get(`/api/getUser/userID=${insertResult.insertedId}`).set('Authorization', `Bearer ${authToken}`)

        expect(statusCode).toBe(200)
      })
    })

    describe('success auth, but user does not exist', () => {
      it('should return 404', async () => {
        const userId = '1234'
        const authToken = await signJwt(userId)

        const { statusCode, body } = await supertest(app).get(`/api/getUser/userID=${userId}`).set('Authorization', `Bearer ${authToken}`)

        expect(statusCode).toBe(404)
        expect(body.mensagem).toEqual('Usuário não encontrado')
      })
    })

    describe('fail auth, auth token has time expired', () => {
      it('should return 401', async () => {
        const userId = '1234'
        const authToken = await expiredSignJwt(userId)

        const { statusCode, body } = await supertest(app).get(`/api/getUser/userID=${userId}`).set('Authorization', `Bearer ${authToken}`)

        expect(statusCode).toBe(401)
        expect(body.mensagem).toEqual('Sessão inválida')
      })
    })

    describe('fail auth, invalid token', () => {
      it('should return 401', async () => {
        const userId = '1234'
        const authToken = '1234'

        const { statusCode, body } = await supertest(app).get(`/api/getUser/userID=${userId}`).set('Authorization', `Bearer ${authToken}`)

        expect(statusCode).toBe(401)
        expect(body.mensagem).toEqual('Não autorizado')
      })
    })
  })
})
