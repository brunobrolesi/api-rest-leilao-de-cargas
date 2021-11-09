import { ResumedAccountModel } from '../../../domain/models/account'
import { LoadAllAccountsRepository } from '../../protocols/db/load-all-accounts-repository'
import { DbLoadAccounts } from './db-load-accounts'

const makeAccount = (): ResumedAccountModel[] => ([
  {
    id: 1,
    name: 'valid_name',
    doc: '60.429.484/0001-10'
  },
  {
    id: 2,
    name: 'valid_name',
    doc: '60.429.484/0021-10'
  }
])

const makeLoadAllAccountsRepository = (): LoadAllAccountsRepository => {
  class LoadAllAccountsRepositoryStub implements LoadAllAccountsRepository {
    async loadAll (): Promise<ResumedAccountModel[]|[]> {
      return await new Promise(resolve => resolve(makeAccount()))
    }
  }

  return new LoadAllAccountsRepositoryStub()
}

interface SutTypes {
  sut: DbLoadAccounts
  loadAllAccountsRepositoryStub: LoadAllAccountsRepository
}

const makeSut = (): SutTypes => {
  const loadAllAccountsRepositoryStub = makeLoadAllAccountsRepository()
  const sut = new DbLoadAccounts(loadAllAccountsRepositoryStub)
  return {
    sut,
    loadAllAccountsRepositoryStub
  }
}

describe('DbLoadOffers', () => {
  it('Should call LoadAllOffersRepository', async () => {
    const { sut, loadAllAccountsRepositoryStub } = makeSut()
    const spyLoadAll = jest.spyOn(loadAllAccountsRepositoryStub, 'loadAll')
    await sut.load()
    expect(spyLoadAll).toHaveBeenCalled()
  })

  it('Should throws LoadAllOffersRepository throws', async () => {
    const { sut, loadAllAccountsRepositoryStub } = makeSut()
    jest.spyOn(loadAllAccountsRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  it('Should return offer array in success', async () => {
    const { sut } = makeSut()
    const offers = await sut.load()
    expect(offers).toEqual(makeAccount())
  })
})
