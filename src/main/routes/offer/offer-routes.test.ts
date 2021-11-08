import request from 'supertest'
import app from '../../config/app'
import prisma from '../../../../client'

describe('Offer Routes', () => {
  beforeEach(async () => {
    const deleteOffers = prisma.offer.deleteMany()

    await prisma.$transaction([deleteOffers])

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
  })
})
