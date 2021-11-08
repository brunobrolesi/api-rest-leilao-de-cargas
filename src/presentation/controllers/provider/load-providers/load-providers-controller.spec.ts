import { ResumedAccountModel } from '../../../../domain/models/account'
import { LoadAllProviders } from '../../../../domain/usecases/load-all-providers'
import { ServerError } from '../../../errors/server-error'
import { LoadProvidersController } from './load-providers-controller'

const makeProviders = (): ResumedAccountModel[] => ([
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

const makeLoadAllProvidersStub = (): LoadAllProviders => {
  class LoadAllProvidersStub implements LoadAllProviders {
    async load (): Promise<ResumedAccountModel[]> {
      return await new Promise(resolve => resolve(makeProviders()))
    }
  }

  return new LoadAllProvidersStub()
}

interface SutTypes {
  sut: LoadProvidersController
  loadAllProvidersStub: LoadAllProviders
}

const makeSut = (): SutTypes => {
  const loadAllProvidersStub = makeLoadAllProvidersStub()
  const sut = new LoadProvidersController(loadAllProvidersStub)

  return {
    sut,
    loadAllProvidersStub
  }
}

describe('LoadProviders Controller', () => {
  it('Should call loadAllProviders', async () => {
    const { sut, loadAllProvidersStub } = makeSut()
    const addSpy = jest.spyOn(loadAllProvidersStub, 'load')
    await sut.handle({})
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if loadAllProviders throws', async () => {
    const { sut, loadAllProvidersStub } = makeSut()
    jest.spyOn(loadAllProvidersStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({})
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should returns 200 and array of providers if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(makeProviders())
  })
})
