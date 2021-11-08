import { ResumedAccountModel } from '../../../../domain/models/account'
import { LoadAllAccounts } from '../../../../domain/usecases/load-all-accounts'
import { ServerError } from '../../../errors/server-error'
import { LoadAccountsController } from './load-account-controller'

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

const makeLoadAllAccountStub = (): LoadAllAccounts => {
  class LoadAllAccountStub implements LoadAllAccounts {
    async load (): Promise<ResumedAccountModel[]> {
      return await new Promise(resolve => resolve(makeAccount()))
    }
  }

  return new LoadAllAccountStub()
}

interface SutTypes {
  sut: LoadAccountsController
  loadAllAccountStub: LoadAllAccounts
}

const makeSut = (): SutTypes => {
  const loadAllAccountStub = makeLoadAllAccountStub()
  const sut = new LoadAccountsController(loadAllAccountStub)

  return {
    sut,
    loadAllAccountStub
  }
}

describe('LoadAccount Controller', () => {
  it('Should call loadAllAccount', async () => {
    const { sut, loadAllAccountStub } = makeSut()
    const addSpy = jest.spyOn(loadAllAccountStub, 'load')
    await sut.handle({})
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if loadAllAccount throws', async () => {
    const { sut, loadAllAccountStub } = makeSut()
    jest.spyOn(loadAllAccountStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({})
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should returns 200 and array of providers if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(makeAccount())
  })
})
