import { Offer } from '.prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { prismaMock } from '../../../../../singleton'
import { OfferModel } from '../../../../domain/models/offer'
import { AddOfferModel } from '../../../../domain/usecases/add-offer'
import { OfferPostgresRepository } from './offer-repository'

const makeSut = (): OfferPostgresRepository => {
  return new OfferPostgresRepository(prismaMock)
}

const makeFakeOffer = (): AddOfferModel => ({
  id_customer: 1,
  from: 'any_location',
  to: 'any_location',
  initial_value: 100,
  amount: 100,
  amount_type: 'any_type'
})

const makeFakeOfferModel = (): OfferModel => ({
  id: 1,
  id_customer: 1,
  from: 'any_location',
  to: 'any_location',
  initial_value: 100,
  amount: 100,
  amount_type: 'any_type'
})

describe('Offer Repository', () => {
  it('Should call prisma client with correct values', async () => {
    const sut = makeSut()
    prismaMock.offer.create.mockResolvedValueOnce(makeFakeOfferModel() as unknown as Offer)
    const spyCreate = jest.spyOn(prismaMock.offer, 'create')
    await sut.add(makeFakeOffer())

    expect(spyCreate).toHaveBeenCalledWith({
      data: {
        id_customer: 1,
        from: 'any_location',
        to: 'any_location',
        initial_value: new Decimal(100),
        amount: new Decimal(100),
        amount_type: 'any_type'
      }
    })
  })

  it('Should return an offer on add success', async () => {
    const sut = makeSut()
    prismaMock.offer.create.mockResolvedValueOnce(makeFakeOfferModel() as unknown as Offer)

    const offer = await sut.add(makeFakeOffer())

    expect(offer).toEqual(makeFakeOfferModel())
  })

  it('Should throws if prisma throws', async () => {
    const sut = makeSut()
    prismaMock.offer.create.mockRejectedValue(new Error())

    const promise = sut.add(makeFakeOffer())

    await expect(promise).rejects.toThrow()
  })

  it('Should return an offer on loadById success', async () => {
    const sut = makeSut()
    prismaMock.offer.findUnique.mockResolvedValueOnce(makeFakeOfferModel() as unknown as Offer)

    const offer = await sut.loadById(1)

    expect(offer).toEqual({
      id: 1,
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'any_type'
    })
  })

  it('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    prismaMock.offer.findUnique.mockResolvedValueOnce(null)

    const offer = await sut.loadById(1)

    expect(offer).toBeNull()
  })

  it('Should return offers array on loadById success', async () => {
    const sut = makeSut()
    prismaMock.offer.findMany.mockResolvedValueOnce([makeFakeOfferModel() as unknown as Offer])

    const offers = await sut.loadAll()

    expect(offers).toEqual([{
      id: 1,
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'any_type'
    }])
  })

  it('Should throws if prisma findMany throws', async () => {
    const sut = makeSut()
    prismaMock.offer.findMany.mockRejectedValue(new Error())

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow()
  })
})
