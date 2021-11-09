import { PrismaClient, Prisma, AmountType } from '.prisma/client'
import { AddOfferRepository } from '../../../../data/protocols/db/add-offer-repository'
import { LoadAllOffersRepository } from '../../../../data/protocols/db/load-all-offers-repository'
import { LoadOfferByIdRepository } from '../../../../data/protocols/db/load-offer-by-id-repository'
import { OfferModel } from '../../../../domain/models/offer'
import { AddOfferModel } from '../../../../domain/usecases/add-offer'

export class OfferPostgresRepository implements AddOfferRepository, LoadOfferByIdRepository, LoadAllOffersRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async add (offerData: AddOfferModel): Promise<OfferModel> {
    const { initial_value, amount, amount_type } = offerData
    const decimal_initial_value = new Prisma.Decimal(initial_value)
    const decimal_amount = new Prisma.Decimal(amount)
    const typeAsAmountType = amount_type as AmountType
    const offerWithDecimalValues = Object.assign({}, offerData, { initial_value: decimal_initial_value, amount: decimal_amount, amount_type: typeAsAmountType })
    const offer = await this.prisma.offer.create({ data: offerWithDecimalValues })
    return offer as unknown as OfferModel
  }

  async loadById (id: number): Promise<OfferModel|null> {
    return this.prisma.offer.findUnique({ where: { id } }) as unknown as OfferModel
  }

  async loadAll (): Promise<OfferModel[]|[]> {
    return this.prisma.offer.findMany() as unknown as OfferModel[]
  }
}
