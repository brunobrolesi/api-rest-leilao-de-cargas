import { OfferModel } from '../../../domain/models/offer'
import { LoadAllOffersRepository } from '../../protocols/db/load-all-offers-repository'
import { DbLoadOffers } from './db-load-offers'

const makeOffers = (): OfferModel[] => ([
  {
    id: 1,
    id_customer: 1,
    from: 'any_location',
    to: 'any_location',
    initial_value: 100,
    amount: 100,
    amount_type: 'any_type'
  },
  {
    id: 2,
    id_customer: 1,
    from: 'any_location',
    to: 'any_location',
    initial_value: 100,
    amount: 100,
    amount_type: 'any_type'
  }
])

const makeLoadAllOffersRepository = (): LoadAllOffersRepository => {
  class LoadAllOffersRepositoryStub implements LoadAllOffersRepository {
    async loadAll (): Promise<OfferModel[]|[]> {
      return await new Promise(resolve => resolve(makeOffers()))
    }
  }

  return new LoadAllOffersRepositoryStub()
}

interface SutTypes {
  sut: DbLoadOffers
  loadAllOffersRepositoryStub: LoadAllOffersRepository
}

const makeSut = (): SutTypes => {
  const loadAllOffersRepositoryStub = makeLoadAllOffersRepository()
  const sut = new DbLoadOffers(loadAllOffersRepositoryStub)
  return {
    sut,
    loadAllOffersRepositoryStub
  }
}

describe('DbLoadOffers', () => {
  it('Should call LoadAllOffersRepository', async () => {
    const { sut, loadAllOffersRepositoryStub } = makeSut()
    const spyLoadAll = jest.spyOn(loadAllOffersRepositoryStub, 'loadAll')
    await sut.load()
    expect(spyLoadAll).toHaveBeenCalled()
  })

  it('Should throws LoadAllOffersRepository throws', async () => {
    const { sut, loadAllOffersRepositoryStub } = makeSut()
    jest.spyOn(loadAllOffersRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  it('Should return offer array in success', async () => {
    const { sut } = makeSut()
    const offers = await sut.load()
    expect(offers).toEqual(makeOffers())
  })
})
