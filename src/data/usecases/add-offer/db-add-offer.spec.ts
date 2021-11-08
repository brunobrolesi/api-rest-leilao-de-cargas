import { OfferModel } from '../../../domain/models/offer'
import { AddOfferModel } from '../../../domain/usecases/add-offer'
import { AddOfferRepository } from '../../protocols/db/add-offer-repository'
import { DbAddOffer } from './db-add-offer'

const makeFakeOfferData = (): AddOfferModel => ({
  id_customer: 1,
  from: 'any_location',
  to: 'any_location',
  initial_value: 100,
  amount: 100,
  amount_type: 'any_type'
})

const makeAddOfferRepository = (): AddOfferRepository => {
  class AddOfferRepositoryStub implements AddOfferRepository {
    async add (offerData: AddOfferModel): Promise<OfferModel> {
      const fakeOffer = {
        id: 1,
        id_customer: 1,
        from: 'any_location',
        to: 'any_location',
        initial_value: 100,
        amount: 100,
        amount_type: 'any_type'
      }
      return await new Promise(resolve => resolve(fakeOffer))
    }
  }
  return new AddOfferRepositoryStub()
}

interface SutTypes {
  sut: DbAddOffer
  addOfferRepositoryStub: AddOfferRepository
}

const makeSut = (): SutTypes => {
  const addOfferRepositoryStub = makeAddOfferRepository()
  const sut = new DbAddOffer(addOfferRepositoryStub)

  return {
    sut,
    addOfferRepositoryStub
  }
}

describe('DbAddOffer', () => {
  it('Should throw if AddOfferRepository throws', async () => {
    const { sut, addOfferRepositoryStub } = makeSut()
    jest.spyOn(addOfferRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeOfferData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return offer id on success', async () => {
    const { sut } = makeSut()
    const offerId = await sut.add(makeFakeOfferData())
    expect(offerId).toEqual({ id: 1 })
  })
})
