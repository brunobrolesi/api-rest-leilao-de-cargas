import request from 'supertest'
import app from '../../config/app'
import prisma from '../../../../client'
import { hash } from 'bcrypt'
import { Decimal } from '@prisma/client/runtime'
import { AmountType } from '.prisma/client'
import { AccountModel } from '../../../domain/models/account'
import { OfferModel } from '../../../domain/models/offer'
import { BidModel } from '../../../domain/models/bid'

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

const makeOffer = async (idCustomer: number): Promise<OfferModel> => {
  const offer = {
    id_customer: idCustomer,
    from: 'any_location',
    to: 'any_location',
    initial_value: new Decimal(100.32),
    amount: new Decimal(1000),
    amount_type: 'KG' as AmountType
  }

  return await prisma.offer.create({
    data: offer
  }) as unknown as OfferModel
}

const makeBid = async (idProvider: number, offerId: number): Promise<BidModel> => {
  const bid = {
    id_provider: idProvider,
    id_offer: offerId,
    value: 100,
    amount: 100
  }

  return await prisma.bid.create({
    data: bid
  }) as unknown as BidModel
}

describe('Bid Routes', () => {
  beforeEach(async () => {
    const deleteBids = prisma.bid.deleteMany()
    const deleteOffers = prisma.offer.deleteMany()
    const deleteCustomers = prisma.customer.deleteMany()
    const deleteProviders = prisma.provider.deleteMany()

    await prisma.$transaction([deleteBids, deleteOffers, deleteCustomers, deleteProviders])

    await prisma.$disconnect()
  })

  describe('/POST /bids', () => {
    it('Should return 403 when token is not provided', async () => {
      const response = await request(app)
        .post('/bids')
        .send({
          id_offer: 1,
          value: 100,
          amount: 200
        })
        .expect(403)

      expect(response.body.error).toBeTruthy()
    })

    it('Should return 403 when token is invalid', async () => {
      const response = await request(app)
        .post('/bids')
        .set('authorization', 'invalidToken')
        .send({
          id_offer: 1,
          value: 100,
          amount: 200
        })
        .expect(403)

      expect(response.body.error).toBeTruthy()
    })

    it('Should return 401 when token belongs to an customer', async () => {
      await makeCustomerAccount()

      const loginResponse = await request(app)
        .post('/customers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(200)

      const { token } = loginResponse.body

      const response = await request(app)
        .post('/bids')
        .set('authorization', token)
        .send({
          id_offer: 1,
          value: 100,
          amount: 200
        })
        .expect(401)

      expect(response.body.error).toBeTruthy()
    })

    it('Should return 201 when token is valid', async () => {
      await makeProviderAccount()

      const { id: idCustomer } = await makeCustomerAccount()

      const { id: idOffer } = await makeOffer(idCustomer)

      const loginResponse = await request(app)
        .post('/providers/login')
        .send({
          email: 'email@mail.com',
          password: 'valid_password'
        })
        .expect(200)

      const { token } = loginResponse.body

      await request(app)
        .post('/bids')
        .set('authorization', token)
        .send({
          id_offer: idOffer,
          value: 100,
          amount: 200
        })
        .expect(201)
    })
  })

  describe('/GET /bids/:id', () => {
    it('Should return 200 if success', async () => {
      const { id: idProvider } = await makeProviderAccount()

      const { id: idCustomer } = await makeCustomerAccount()

      const { id: idOffer } = await makeOffer(idCustomer)

      await makeBid(idProvider, idOffer)

      const response = await request(app)
        .get(`/bids/${idOffer}`)
        .send()
        .expect(200)
      expect(response.body).toHaveLength(1)
    })
  })
})
