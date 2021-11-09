import { BidModel } from '../../../../domain/models/bid'
import { LoadAllOfferBids } from '../../../../domain/usecases/load-all-offer-bids'
import { ServerError } from '../../../errors/server-error'
import { HttpRequest } from '../../../protocols/http'
import { LoadBidsController } from './load-bids-controller'

const makeBids = (): BidModel[] => ([
  {
    id_provider: 1,
    id_offer: 2,
    value: 100,
    amount: 100
  },
  {
    id_provider: 3,
    id_offer: 2,
    value: 100,
    amount: 100
  }
])

const makeLoadAllBidsStub = (): LoadAllOfferBids => {
  class LoadAllBidsStub implements LoadAllOfferBids {
    async load (): Promise<BidModel[]> {
      return await new Promise(resolve => resolve(makeBids()))
    }
  }

  return new LoadAllBidsStub()
}

const makeHttpRequest = (): HttpRequest => ({
  params: {
    id: 2
  }
})

interface SutTypes {
  sut: LoadBidsController
  loadAllBidsStub: LoadAllOfferBids
}

const makeSut = (): SutTypes => {
  const loadAllBidsStub = makeLoadAllBidsStub()
  const sut = new LoadBidsController(loadAllBidsStub)

  return {
    sut,
    loadAllBidsStub
  }
}

describe('AddBid Controller', () => {
  it('Should call loadAllBids', async () => {
    const { sut, loadAllBidsStub } = makeSut()
    const addSpy = jest.spyOn(loadAllBidsStub, 'load')
    await sut.handle(makeHttpRequest())
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if loadAllBids throws', async () => {
    const { sut, loadAllBidsStub } = makeSut()
    jest.spyOn(loadAllBidsStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(makeHttpRequest())
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ error: new ServerError().message })
  })

  it('Should returns 200 and array of bids if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeHttpRequest())
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(makeBids())
  })
})
