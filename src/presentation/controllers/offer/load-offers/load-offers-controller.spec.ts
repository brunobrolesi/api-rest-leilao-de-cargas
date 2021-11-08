import { OfferModel } from '../../../../domain/models/offer'
import { LoadAllOffers } from '../../../../domain/usecases/load-all-offers'
import { ServerError } from '../../../errors/server-error'
import { LoadOffersController } from './load-offers-controller'

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

const makeLoadAllOffersStub = (): LoadAllOffers => {
  class LoadAllOffersStub implements LoadAllOffers {
    async load (): Promise<OfferModel[]> {
      return await new Promise(resolve => resolve(makeOffers()))
    }
  }

  return new LoadAllOffersStub()
}

interface SutTypes {
  sut: LoadOffersController
  loadAllOffersStub: LoadAllOffers
}

const makeSut = (): SutTypes => {
  const loadAllOffersStub = makeLoadAllOffersStub()
  const sut = new LoadOffersController(loadAllOffersStub)

  return {
    sut,
    loadAllOffersStub
  }
}

describe('AddOffer Controller', () => {
  it('Should call loadAllOffers', async () => {
    const { sut, loadAllOffersStub } = makeSut()
    const addSpy = jest.spyOn(loadAllOffersStub, 'load')
    await sut.handle({})
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if loadAllOffers throws', async () => {
    const { sut, loadAllOffersStub } = makeSut()
    jest.spyOn(loadAllOffersStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({})
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should returns 200 and array of offers if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(makeOffers())
  })
})
