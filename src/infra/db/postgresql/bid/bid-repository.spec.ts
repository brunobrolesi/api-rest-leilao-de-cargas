import { Bid } from '.prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { prismaMock } from '../../../../../singleton'
import { BidModel } from '../../../../domain/models/bid'
import { AddBidModel } from '../../../../domain/usecases/add-bid'
import { BidPostgresRepository } from './bid-repository'

const makeSut = (): BidPostgresRepository => {
  return new BidPostgresRepository(prismaMock)
}

const makeFakeBid = (): AddBidModel => ({
  id_provider: 1,
  id_offer: 2,
  value: 100,
  amount: 100
})

const makeFakeBidModel = (): BidModel => ({
  id_provider: 1,
  id_offer: 2,
  value: 100,
  amount: 100
})

describe('Bid Repository', () => {
  it('Should call prisma client with correct values', async () => {
    const sut = makeSut()
    prismaMock.bid.create.mockResolvedValueOnce(makeFakeBidModel() as unknown as Bid)
    const spyCreate = jest.spyOn(prismaMock.bid, 'create')
    await sut.add(makeFakeBid())

    expect(spyCreate).toHaveBeenCalledWith({
      data: {
        id_provider: 1,
        id_offer: 2,
        value: new Decimal(100),
        amount: new Decimal(100)
      }
    })
  })

  it('Should return an bid on add success', async () => {
    const sut = makeSut()
    prismaMock.bid.create.mockResolvedValueOnce(makeFakeBidModel() as unknown as Bid)

    const bid = await sut.add(makeFakeBid())

    expect(bid).toEqual(makeFakeBidModel())
  })

  it('Should throws if prisma throws', async () => {
    const sut = makeSut()
    prismaMock.bid.create.mockRejectedValue(new Error())

    const promise = sut.add(makeFakeBid())

    await expect(promise).rejects.toThrow()
  })
})
