import { TokenPayload, TokenVerifier } from '../../data/protocols/criptography/token-verifier'
import { MissingAuthToken } from '../errors/missing-auth-token'
import { forbidden, unauthorized } from '../helpers/http-helper'
import { HttpRequest } from '../protocols/http'
import { AuthMiddleware } from './auth-middleware'

const makeTokenVerifierStub = (): TokenVerifier => {
  class TokenVerifierStub implements TokenVerifier {
    verify (token: string): TokenPayload {
      const payload = { id: 1, email: 'any@mail.com', role: 'any_role' }
      return payload
    }
  }

  return new TokenVerifierStub()
}

interface SutTypes {
  sut: AuthMiddleware
  tokenVerifierStub: TokenVerifier
}

const makeSut = (): SutTypes => {
  const role = 'any_role'
  const tokenVerifierStub = makeTokenVerifierStub()
  const sut = new AuthMiddleware(tokenVerifierStub, role)

  return {
    sut,
    tokenVerifierStub
  }
}

const makeHttpRequest = (): HttpRequest => ({
  headers: {
    authorization: 'any_token'
  }
})

describe('Auth Middleware', () => {
  it('Should return 403 if no token is provided in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new MissingAuthToken()))
  })

  it('Should call token verifier with correct token', async () => {
    const { sut, tokenVerifierStub } = makeSut()
    const spyVerify = jest.spyOn(tokenVerifierStub, 'verify')
    await sut.handle(makeHttpRequest())
    expect(spyVerify).toHaveBeenCalledWith('any_token')
  })

  it('Should return 401 if role is unauthorized', async () => {
    const { sut, tokenVerifierStub } = makeSut()
    jest.spyOn(tokenVerifierStub, 'verify').mockReturnValueOnce({ id: 1, email: 'any@mail.com', role: 'invalid_role' })
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
})
