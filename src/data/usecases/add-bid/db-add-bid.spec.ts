import { BidModel } from '../../../domain/models/bid'
import { OfferModel } from '../../../domain/models/offer'
import { AddBidModel } from '../../../domain/usecases/add-bid'
import { AddBidRepository } from '../../protocols/db/add-bid-repository'
import { LoadOfferByIdRepository } from '../../protocols/db/load-offer-by-id-repository'
import { DbAddBid } from './db-add-bid'

const makeFakeBidData = (): AddBidModel => ({
  id_provider: 1,
  id_offer: 2,
  value: 100,
  amount: 100
})

const makeLoadOfferByIdRepository = (): LoadOfferByIdRepository => {
  class LoadOfferByIdRepositoryStub implements LoadOfferByIdRepository {
    async loadById (id: number): Promise<OfferModel> {
      const fakeOffer = {
        id: 1,
        id_customer: 1,
        from: 'any_location',
        to: 'any_location',
        initial_value: 100,
        amount: 1000,
        amount_type: 'any_type'
      }
      return await new Promise(resolve => resolve(fakeOffer))
    }
  }
  return new LoadOfferByIdRepositoryStub()
}

const makeAddBidRepository = (): AddBidRepository => {
  class AddBidRepositoryStub implements AddBidRepository {
    async add (bidData: AddBidModel): Promise<BidModel> {
      const fakeBid = {
        id: 1,
        id_provider: 1,
        id_offer: 2,
        value: 100,
        amount: 100
      }
      return await new Promise(resolve => resolve(fakeBid))
    }
  }
  return new AddBidRepositoryStub()
}

interface SutTypes {
  sut: DbAddBid
  loadOfferByIdRepositoryStub: LoadOfferByIdRepository
  addBidRepositoryStub: AddBidRepository
}

const makeSut = (): SutTypes => {
  const addBidRepositoryStub = makeAddBidRepository()
  const loadOfferByIdRepositoryStub = makeLoadOfferByIdRepository()
  const sut = new DbAddBid(loadOfferByIdRepositoryStub, addBidRepositoryStub)

  return {
    sut,
    loadOfferByIdRepositoryStub,
    addBidRepositoryStub
  }
}

describe('DbAddBid', () => {
  it('Should throw if LoadOfferByIdRepository throws', async () => {
    const { sut, loadOfferByIdRepositoryStub } = makeSut()
    jest.spyOn(loadOfferByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeBidData())
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if LoadOfferByIdRepository returns null', async () => {
    const { sut, loadOfferByIdRepositoryStub } = makeSut()
    jest.spyOn(loadOfferByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = sut.add(makeFakeBidData())
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if offer amount is less then bid amount', async () => {
    const { sut, loadOfferByIdRepositoryStub } = makeSut()
    jest.spyOn(loadOfferByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(
      {
        id: 1,
        id_customer: 1,
        from: 'any_location',
        to: 'any_location',
        initial_value: 100,
        amount: 1,
        amount_type: 'any_type'
      }
    )))
    const promise = sut.add(makeFakeBidData())
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if AddBidRepository throws', async () => {
    const { sut, addBidRepositoryStub } = makeSut()
    jest.spyOn(addBidRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeBidData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return bid id on success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(makeFakeBidData())
    expect(result).toEqual({ id: 1 })
  })
})
