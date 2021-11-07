import request from 'supertest'
import app from '../../config/app'
import prisma from '../../../../client'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  beforeEach(async () => {
    const deleteCustomers = prisma.customer.deleteMany()
    const deleteProviders = prisma.provider.deleteMany()

    await prisma.$transaction([deleteCustomers, deleteProviders])

    await prisma.$disconnect()
  })

  describe('/POST customers/signup', () => {
    it('Should return 400 and error message when invalid body is provided', async () => {
      const response = await request(app)
        .post('/customers/signup')
        .send({
          email: 'invalid',
          password: 'valid_password'
        })
        .expect(400)

      expect(response.body.message).toBeTruthy()
    })

    it('Should return 201 and an account on success', async () => {
      const response = await request(app)
        .post('/customers/signup')
        .send({
          email: 'email@mail.com',
          password: 'valid_password',
          name: 'valid_name',
          doc: '60.429.484/0001-10',
          about: 'valid_about',
          site: 'valid_site'
        })
        .expect(201)

      expect(response.body.id).toBeTruthy()
      expect(response.body.email).toBe('email@mail.com')
      expect(response.body.password).not.toBe('valid_password')
      expect(response.body.name).toBe('valid_name')
      expect(response.body.doc).toBe('60.429.484/0001-10')
      expect(response.body.about).toBe('valid_about')
      expect(response.body.site).toBe('valid_site')
    })
  })

  describe('/POST customers/login', () => {
    it('Should return 400 and error message when invalid body is provided', async () => {
      const response = await request(app)
        .post('/customers/login')
        .send({
          email: 'email@mail.com'
        })
        .expect(400)

      expect(response.body.message).toBeTruthy()
    })

    it('Should return 401 if credential are invalid ', async () => {
      const response = await request(app)
        .post('/customers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(401)

      expect(response.body.message).toBeTruthy()
    })

    it('Should return 200 and token if success', async () => {
      const password = await hash('valid_password', 12)
      const account = {
        email: 'email@mail.com',
        password,
        name: 'valid_name',
        doc: '60.429.484/0001-10',
        about: 'valid_about',
        site: 'valid_site'
      }

      await prisma.customer.create({
        data: account
      })

      const response = await request(app)
        .post('/customers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(200)

      expect(response.body.token).toBeTruthy()
    })
  })

  describe('/POST providers/signup', () => {
    it('Should return 400 and error message when invalid body is provided', async () => {
      const response = await request(app)
        .post('/providers/signup')
        .send({
          email: 'invalid',
          password: 'valid_password'
        })
        .expect(400)

      expect(response.body.message).toBeTruthy()
    })

    it('Should return 201 and an account on success', async () => {
      const response = await request(app)
        .post('/providers/signup')
        .send({
          email: 'email@mail.com',
          password: 'valid_password',
          name: 'valid_name',
          doc: '60.429.484/0001-10',
          about: 'valid_about',
          site: 'valid_site'
        })
        .expect(201)

      expect(response.body.id).toBeTruthy()
      expect(response.body.email).toBe('email@mail.com')
      expect(response.body.password).not.toBe('valid_password')
      expect(response.body.name).toBe('valid_name')
      expect(response.body.doc).toBe('60.429.484/0001-10')
      expect(response.body.about).toBe('valid_about')
      expect(response.body.site).toBe('valid_site')
    })
  })

  describe('/POST providers/login', () => {
    it('Should return 400 and error message when invalid is provided', async () => {
      const response = await request(app)
        .post('/providers/login')
        .send({
          email: 'email@mail.com'
        })
        .expect(400)

      expect(response.body.message).toBeTruthy()
    })

    it('Should return 401 if credential are invalid ', async () => {
      const response = await request(app)
        .post('/providers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(401)

      expect(response.body.message).toBeTruthy()
    })

    it('Should return 200 and token if success', async () => {
      const password = await hash('valid_password', 12)
      const account = {
        email: 'email@mail.com',
        password,
        name: 'valid_name',
        doc: '60.429.484/0001-10',
        about: 'valid_about',
        site: 'valid_site'
      }

      await prisma.provider.create({
        data: account
      })

      const response = await request(app)
        .post('/providers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(200)

      expect(response.body.token).toBeTruthy()
    })
  })
})
