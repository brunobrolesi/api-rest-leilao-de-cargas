import { PrismaClient, Prisma, AmountType } from '.prisma/client'
import { AddOfferRepository } from '../../../../data/protocols/db/add-offer-repository'
import { OfferModel } from '../../../../domain/models/offer'
import { AddOfferModel } from '../../../../domain/usecases/add-offer'

export class OfferPostgresRepository implements AddOfferRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async add (offerData: AddOfferModel): Promise<OfferModel> {
    const { initial_value, amount, amount_type } = offerData
    const decimal_initial_value = new Prisma.Decimal(initial_value)
    const decimal_amount = new Prisma.Decimal(amount)
    const typeAsAmountType = amount_type as AmountType
    const OfferWithDecimalValues = Object.assign({}, offerData, { initial_value: decimal_initial_value, amount: decimal_amount, amount_type: typeAsAmountType })
    const offer = await this.prisma.offer.create({ data: OfferWithDecimalValues })
    return { id: offer.id, ...offerData }
  }
}
