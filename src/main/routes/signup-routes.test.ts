import request from 'supertest'
import app from '../config/app'
import prisma from '../../../client'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    const deleteCustomers = prisma.customer.deleteMany()
    const deleteProviders = prisma.provider.deleteMany()

    await prisma.$transaction([deleteCustomers, deleteProviders])

    await prisma.$disconnect()
  })

  it('Should return 400 and error message when invalid customer body is provided', async () => {
    const response = await request(app)
      .post('/customers/signup')
      .send({
        email: 'invalid',
        password: 'valid_password'
      })
      .expect(400)

    expect(response.body.message).toBeTruthy()
  })

  it('Should return 201 and an customer account on success', async () => {
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

  it('Should return 400 and error message when invalid provider body is provided', async () => {
    const response = await request(app)
      .post('/providers/signup')
      .send({
        email: 'invalid',
        password: 'valid_password'
      })
      .expect(400)

    expect(response.body.message).toBeTruthy()
  })

  it('Should return 201 and an provider account on success', async () => {
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
