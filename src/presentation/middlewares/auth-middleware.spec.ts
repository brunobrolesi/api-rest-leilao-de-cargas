import { MissingAuthToken } from '../errors/missing-auth-token'
import { forbidden } from '../helpers/http-helper'
import { Middleware } from '../protocols/middleware'
import { AuthMiddleware } from './auth-middleware'

const makeSut = (): Middleware => {
  return new AuthMiddleware()
}

describe('Auth Middleware', () => {
  it('Should return 403 if no token is provided in headers', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new MissingAuthToken()))
  })
})
