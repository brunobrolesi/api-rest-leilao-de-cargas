import { BodyValidator } from '../../../protocols/body-validator'
import { ValidatorResult } from '../../../protocols/validator-result'
import { AddOfferController } from './add-offer-controller'

const makeAddOfferBodyValidatorStub = (): BodyValidator => {
  class SignUpBodyValidatorStub implements BodyValidator {
    isValid (body: object): ValidatorResult {
      return {}
    }
  }

  return new SignUpBodyValidatorStub()
}

const makeFakeHttpRequest = (): any => ({
  body: {
    id_customer: 'any_id',
    from: 'any_location',
    to: 'any_location',
    initial_value: 'any_value',
    amount: 'any_amount',
    amount_type: 'any_type'
  }
})

interface SutTypes {
  sut: AddOfferController
  addOfferBodyValidatorStub: BodyValidator
}

const makeSut = (): SutTypes => {
  const addOfferBodyValidatorStub = makeAddOfferBodyValidatorStub()
  const sut = new AddOfferController(addOfferBodyValidatorStub)

  return {
    sut,
    addOfferBodyValidatorStub
  }
}

describe('AddOffer Controller', () => {
  it('Should call body validator with correct values', async () => {
    const { sut, addOfferBodyValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(addOfferBodyValidatorStub, 'isValid')
    await sut.handle(makeFakeHttpRequest())
    expect(validatorSpy).toHaveBeenCalledWith({
      id_customer: 'any_id',
      from: 'any_location',
      to: 'any_location',
      initial_value: 'any_value',
      amount: 'any_amount',
      amount_type: 'any_type'
    })
  })
})
