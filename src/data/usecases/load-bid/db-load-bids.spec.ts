import { BidModel } from '../../../domain/models/bid'
import { LoadAllBidsByOfferIdRepository } from '../../protocols/db/load-all-bids-by-offer-id-repository'
import { DbLoadBids } from './db-load-bids'

const makeBids = (): BidModel[] => ([
  {
    id: 1,
    id_provider: 1,
    id_offer: 2,
    value: 100,
    amount: 100
  },
  {
    id: 2,
    id_provider: 3,
    id_offer: 2,
    value: 100,
    amount: 100
  }
])

const makeLoadAllBidsByOfferIdRepository = (): LoadAllBidsByOfferIdRepository => {
  class LoadAllBidsByOfferIdRepositoryStub implements LoadAllBidsByOfferIdRepository {
    async loadAllByOfferId (): Promise<BidModel[]|[]> {
      return await new Promise(resolve => resolve(makeBids()))
    }
  }

  return new LoadAllBidsByOfferIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadBids
  loadAllBidsByOfferIdRepositoryStub: LoadAllBidsByOfferIdRepository
}

const makeSut = (): SutTypes => {
  const loadAllBidsByOfferIdRepositoryStub = makeLoadAllBidsByOfferIdRepository()
  const sut = new DbLoadBids(loadAllBidsByOfferIdRepositoryStub)
  return {
    sut,
    loadAllBidsByOfferIdRepositoryStub
  }
}

describe('DbLoadBids', () => {
  it('Should call LoadAllBidsByOfferIdRepository', async () => {
    const { sut, loadAllBidsByOfferIdRepositoryStub } = makeSut()
    const spyLoadAll = jest.spyOn(loadAllBidsByOfferIdRepositoryStub, 'loadAllByOfferId')
    await sut.load(2)
    expect(spyLoadAll).toHaveBeenCalledWith(2)
  })

  it('Should throws LoadAllOffersRepository throws', async () => {
    const { sut, loadAllBidsByOfferIdRepositoryStub } = makeSut()
    jest.spyOn(loadAllBidsByOfferIdRepositoryStub, 'loadAllByOfferId').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(2)
    await expect(promise).rejects.toThrow()
  })

  it('Should return bid array in success', async () => {
    const { sut } = makeSut()
    const offers = await sut.load(2)
    expect(offers).toEqual(makeBids())
  })
})
