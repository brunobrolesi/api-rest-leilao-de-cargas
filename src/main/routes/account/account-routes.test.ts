import request from 'supertest'
import app from '../../config/app'
import prisma from '../../../../client'
import { hash } from 'bcrypt'
import { AccountModel } from '../../../domain/models/account'

const makeProviderAccount = async (): Promise<AccountModel> => {
  const password = await hash('valid_password', 12)
  const account = {
    email: 'email@mail.com',
    password,
    name: 'valid_name',
    doc: '60.429.484/0001-10',
    about: 'valid_about',
    site: 'valid_site'
  }

  return await prisma.provider.create({
    data: account
  })
}

const makeCustomerAccount = async (): Promise<AccountModel> => {
  const password = await hash('valid_password', 12)
  const account = {
    email: 'email@mail.com',
    password,
    name: 'valid_name',
    doc: '60.429.484/0001-10',
    about: 'valid_about',
    site: 'valid_site'
  }

  return await prisma.customer.create({
    data: account
  })
}

describe('Account Routes', () => {
  beforeEach(async () => {
    const deleteBids = prisma.bid.deleteMany()
    const deleteOffers = prisma.offer.deleteMany()
    const deleteCustomers = prisma.customer.deleteMany()
    const deleteProviders = prisma.provider.deleteMany()

    await prisma.$transaction([deleteBids, deleteOffers, deleteCustomers, deleteProviders])

    await prisma.$disconnect()
  })

  describe('/GET /providers', () => {
    it('Should return 200 success', async () => {
      await makeProviderAccount()

      const response = await request(app)
        .get('/providers')
        .send({})
        .expect(200)

      expect(response.body).toHaveLength(1)
    })
  })

  describe('/GET /customers', () => {
    it('Should return 200 success', async () => {
      await makeCustomerAccount()

      const response = await request(app)
        .get('/customers')
        .send({})
        .expect(200)

      expect(response.body).toHaveLength(1)
    })
  })
})
