import { SignUpBodyValidator } from '../protocols/signup-body-validator'
import { ValidatorResult } from '../protocols/validator-result'
import { SignUpController } from './signup'

const makeSignUpBodyValidatorStub = (): SignUpBodyValidator => {
  class SignUpBodyValidatorStub implements SignUpBodyValidator {
    isValid (body: object): ValidatorResult {
      return {}
    }
  }

  return new SignUpBodyValidatorStub()
}

interface SutTypes {
  sut: SignUpController
  signUpBodyValidatorStub: SignUpBodyValidator
}

const makeSut = (): SutTypes => {
  const signUpBodyValidatorStub = makeSignUpBodyValidatorStub()
  const sut = new SignUpController(signUpBodyValidatorStub)
  return {
    sut,
    signUpBodyValidatorStub
  }
}

describe('Signup Controller', () => {
  it('Should call body validator with correct values', () => {
    const { sut, signUpBodyValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(signUpBodyValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        doc: 'any_doc',
        about: 'any_about',
        active: true,
        site: 'any_site'
      }
    }
    sut.handle(httpRequest)
    expect(validatorSpy).toHaveBeenCalledWith({
      doc: 'any_doc',
      about: 'any_about',
      active: true,
      site: 'any_site'
    })
  })
})
