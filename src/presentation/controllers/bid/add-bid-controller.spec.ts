import { AddBid, AddBidModel } from '../../../domain/usecases/add-bid'
import { ServerError } from '../../errors/server-error'
import { BodyValidator } from '../../protocols/body-validator'
import { ValidatorResult } from '../../protocols/validator-result'
import { AddBidController } from './add-bid-controller'

const makeAddBidBodyValidatorStub = (): BodyValidator => {
  class SignUpBodyValidatorStub implements BodyValidator {
    isValid (body: object): ValidatorResult {
      return {}
    }
  }

  return new SignUpBodyValidatorStub()
}

const makeAddBidStub = (): AddBid => {
  class AddBidStub implements AddBid {
    async add (data: AddBidModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new AddBidStub()
}

const makeFakeHttpRequest = (): any => ({
  body: {
    id_provider: 1,
    id_offer: 2,
    value: 100,
    amount: 100
  }
})

interface SutTypes {
  sut: AddBidController
  addBidBodyValidatorStub: BodyValidator
  addBidStub: AddBid
}

const makeSut = (): SutTypes => {
  const addBidBodyValidatorStub = makeAddBidBodyValidatorStub()
  const addBidStub = makeAddBidStub()
  const sut = new AddBidController(addBidBodyValidatorStub, addBidStub)

  return {
    sut,
    addBidBodyValidatorStub,
    addBidStub
  }
}

describe('AddBid Controller', () => {
  it('Should call body validator with correct values', async () => {
    const { sut, addBidBodyValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(addBidBodyValidatorStub, 'isValid')
    await sut.handle(makeFakeHttpRequest())
    expect(validatorSpy).toHaveBeenCalledWith({
      id_provider: 1,
      id_offer: 2,
      value: 100,
      amount: 100
    })
  })

  it('Should return 400 if validator returns an error', async () => {
    const { sut, addBidBodyValidatorStub } = makeSut()
    jest.spyOn(addBidBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toBe(400)
  })

  it('Should return error message in body if validator returns an error', async () => {
    const { sut, addBidBodyValidatorStub } = makeSut()
    jest.spyOn(addBidBodyValidatorStub, 'isValid').mockReturnValueOnce({ error: new Error('any_message') })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.body.message).toBe('any_message')
  })

  it('Should call add bid with correct values', async () => {
    const { sut, addBidStub } = makeSut()
    const addSpy = jest.spyOn(addBidStub, 'add')
    await sut.handle(makeFakeHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      id_provider: 1,
      id_offer: 2,
      value: 100,
      amount: 100
    })
  })

  it('Should return 500 if addBid throws', async () => {
    const { sut, addBidStub } = makeSut()
    jest.spyOn(addBidStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should returns 201 if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response.statusCode).toBe(201)
    expect(response.body).toBeNull()
  })
})
