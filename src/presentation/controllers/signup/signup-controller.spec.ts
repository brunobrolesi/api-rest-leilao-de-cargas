import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { ServerError } from '../../errors/server-error'
import { BodyValidator } from '../../protocols/body-validator'
import { ValidatorResult } from '../../protocols/validator-result'
import { SignUpController } from './signup-controller'

const makeSignUpBodyValidatorStub = (): BodyValidator => {
  class SignUpBodyValidatorStub implements BodyValidator {
    isValid (body: object): ValidatorResult {
      return {}
    }
  }

  return new SignUpBodyValidatorStub()
}

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve({
        id: 1,
        email: 'any_email',
        password: 'any_password',
        name: 'any_name',
        doc: 'any_doc',
        about: 'any_about',
        site: 'any_site',
        active: true
      }))
    }
  }

  return new AddAccountStub()
}

const makeFakeHttpRequest = (): any => ({
  body: {
    email: 'any_email',
    password: 'any_password',
    name: 'any_name',
    doc: 'any_doc',
    about: 'any_about',
    site: 'any_site'
  }
})

interface SutTypes {
  sut: SignUpController
  signUpBodyValidatorStub: BodyValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const signUpBodyValidatorStub = makeSignUpBodyValidatorStub()
  const addAccountStub = makeAddAccountStub()
  const sut = new SignUpController(signUpBodyValidatorStub, addAccountStub)
  return {
    sut,
    signUpBodyValidatorStub,
    addAccountStub
  }
}

describe('Signup Controller', () => {
  it('Should call body validator with correct values', async () => {
    const { sut, signUpBodyValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(signUpBodyValidatorStub, 'isValid')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      doc: 'any_doc',
      about: 'any_about',
      site: 'any_site'
    })
  })

  it('Should return 400 if validator returns an error', async () => {
    const { sut, signUpBodyValidatorStub } = makeSut()
    jest.spyOn(signUpBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
  })

  it('Should return error message in body if validator returns an error', async () => {
    const { sut, signUpBodyValidatorStub } = makeSut()
    jest.spyOn(signUpBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.body.message).toBe('any_message')
  })

  it('Should call add account with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const validatorSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      doc: 'any_doc',
      about: 'any_about',
      site: 'any_site'
    })
  })

  it('Should return 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should return 201 and an account on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      id: 1,
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      doc: 'any_doc',
      about: 'any_about',
      site: 'any_site',
      active: true
    })
  })
})
