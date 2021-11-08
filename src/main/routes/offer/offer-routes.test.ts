import request from 'supertest'
import app from '../../config/app'
import prisma from '../../../../client'
import { hash } from 'bcrypt'

describe('Offer Routes', () => {
  beforeEach(async () => {
    const deleteBids = prisma.bid.deleteMany()
    const deleteOffers = prisma.offer.deleteMany()
    const deleteCustomers = prisma.customer.deleteMany()
    const deleteProviders = prisma.provider.deleteMany()

    await prisma.$transaction([deleteBids, deleteOffers, deleteCustomers, deleteProviders])

    await prisma.$disconnect()
  })

  describe('/POST /offers', () => {
    it('Should return 403 when token is not provided', async () => {
      const response = await request(app)
        .post('/offers')
        .send({
          from: 'any_location',
          to: 'any_location',
          initial_value: 100.32,
          amount: 100,
          amount_type: 'KG'
        })
        .expect(403)

      expect(response.body.message).toBeTruthy()
    })

    it('Should return 201 and offer id when token is valid', async () => {
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

      const loginResponse = await request(app)
        .post('/customers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(200)

      const { token } = loginResponse.body

      const response = await request(app)
        .post('/offers')
        .set('authorization', token)
        .send({
          from: 'any_location',
          to: 'any_location',
          initial_value: 100.32,
          amount: 100,
          amount_type: 'KG'
        })
        .expect(201)

      expect(response.body.id).toBeTruthy()
    })

    it('Should return 401 when token belongs to an provider', async () => {
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

      const loginResponse = await request(app)
        .post('/providers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(200)

      const { token } = loginResponse.body

      const response = await request(app)
        .post('/offers')
        .set('authorization', token)
        .send({
          from: 'any_location',
          to: 'any_location',
          initial_value: 100.32,
          amount: 100,
          amount_type: 'KG'
        })
        .expect(401)

      expect(response.body.message).toBeTruthy()
    })
  })
})
