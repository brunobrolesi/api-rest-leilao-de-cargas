import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { ServerError } from '../../errors/server-error'
import { BodyValidator } from '../../protocols/body-validator'
import { ValidatorResult } from '../../protocols/validator-result'
import { LoginController } from './login'

const makeLoginBodyValidatorStub = (): BodyValidator => {
  class LoginBodyValidatorStub implements BodyValidator {
    isValid (body: object): ValidatorResult {
      return {}
    }
  }

  return new LoginBodyValidatorStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}
const makeFakeHttpRequest = (): any => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  loginBodyValidatorStub: BodyValidator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const loginBodyValidatorStub = makeLoginBodyValidatorStub()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(loginBodyValidatorStub, authenticationStub)
  return {
    sut,
    loginBodyValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  it('Should call body validator with correct values', async () => {
    const { sut, loginBodyValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(loginBodyValidatorStub, 'isValid')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password'
    })
  })

  it('Should return 400 if validator returns an error', async () => {
    const { sut, loginBodyValidatorStub } = makeSut()
    jest.spyOn(loginBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
  })

  it('Should return error message in body if validator returns an error', async () => {
    const { sut, loginBodyValidatorStub } = makeSut()
    jest.spyOn(loginBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.body.message).toBe('any_message')
  })

  it('Should call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email', password: 'any_password' })
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(401)
  })

  it('Should return 500 if authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: 'any_token' })
  })
})
