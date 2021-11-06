import { BodyValidator } from '../protocols/body-validator'
import { ValidatorResult } from '../protocols/validator-result'
import { LoginController } from './login'

const makeLoginBodyValidatorStub = (): BodyValidator => {
  class LoginBodyValidatorStub implements BodyValidator {
    isValid (body: object): ValidatorResult {
      return {}
    }
  }

  return new LoginBodyValidatorStub()
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
}

const makeSut = (): SutTypes => {
  const loginBodyValidatorStub = makeLoginBodyValidatorStub()
  const sut = new LoginController(loginBodyValidatorStub)
  return {
    sut,
    loginBodyValidatorStub
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
})
