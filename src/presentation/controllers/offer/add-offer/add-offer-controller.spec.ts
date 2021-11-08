import { AddOffer, AddOfferModel, OfferId } from '../../../../domain/usecases/add-offer'
import { ServerError } from '../../../errors/server-error'
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

const makeAddOfferStub = (): AddOffer => {
  class AddOfferStub implements AddOffer {
    async add (data: AddOfferModel): Promise<OfferId> {
      return await new Promise(resolve => resolve({ id: 1 }))
    }
  }

  return new AddOfferStub()
}

const makeFakeHttpRequest = (): any => ({
  body: {
    id_customer: 1,
    from: 'any_location',
    to: 'any_location',
    initial_value: 100,
    amount: 100,
    amount_type: 'any_type'
  }
})

interface SutTypes {
  sut: AddOfferController
  addOfferBodyValidatorStub: BodyValidator
  addOfferStub: AddOffer
}

const makeSut = (): SutTypes => {
  const addOfferBodyValidatorStub = makeAddOfferBodyValidatorStub()
  const addOfferStub = makeAddOfferStub()
  const sut = new AddOfferController(addOfferBodyValidatorStub, addOfferStub)

  return {
    sut,
    addOfferBodyValidatorStub,
    addOfferStub
  }
}

describe('AddOffer Controller', () => {
  it('Should call body validator with correct values', async () => {
    const { sut, addOfferBodyValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(addOfferBodyValidatorStub, 'isValid')
    await sut.handle(makeFakeHttpRequest())
    expect(validatorSpy).toHaveBeenCalledWith({
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'any_type'
    })
  })

  it('Should return 400 if validator returns an error', async () => {
    const { sut, addOfferBodyValidatorStub } = makeSut()
    jest.spyOn(addOfferBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toBe(400)
  })

  it('Should return error message in body if validator returns an error', async () => {
    const { sut, addOfferBodyValidatorStub } = makeSut()
    jest.spyOn(addOfferBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.body.message).toBe('any_message')
  })

  it('Should call add offer with correct values', async () => {
    const { sut, addOfferStub } = makeSut()
    const addSpy = jest.spyOn(addOfferStub, 'add')
    await sut.handle(makeFakeHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'any_type'
    })
  })

  it('Should return 500 if addOffer throws', async () => {
    const { sut, addOfferStub } = makeSut()
    jest.spyOn(addOfferStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should returns 201 and offer id if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ id: 1 })
  })
})
