import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/signup')
      .send({
        email: 'valid_email',
        password: 'valid_password',
        name: 'valid_name',
        doc: 'valid_doc',
        about: 'valid_about',
        site: 'valid_site',
        role: 'valid_role'
      })
      .expect(200)
  })
})
