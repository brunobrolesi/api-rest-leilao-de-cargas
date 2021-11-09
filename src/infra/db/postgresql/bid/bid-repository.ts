import { PrismaClient, Prisma } from '.prisma/client'
import { AddBidRepository } from '../../../../data/protocols/db/add-bid-repository'
import { LoadAllBidsByOfferIdRepository } from '../../../../data/protocols/db/load-all-bids-by-offer-id-repository'
import { BidModel } from '../../../../domain/models/bid'
import { AddBidModel } from '../../../../domain/usecases/add-bid'

export class BidPostgresRepository implements AddBidRepository, LoadAllBidsByOfferIdRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async add (bidData: AddBidModel): Promise<BidModel> {
    const { value, amount } = bidData
    const decimal_value = new Prisma.Decimal(value)
    const decimal_amount = new Prisma.Decimal(amount)
    const bidWithDecimalValues = Object.assign({}, bidData, { value: decimal_value, amount: decimal_amount })
    const bid = await this.prisma.bid.create({ data: bidWithDecimalValues })
    return bid as unknown as BidModel
  }

  async loadAllByOfferId (offerId: number): Promise<BidModel[]|[]> {
    return await this.prisma.bid.findMany({ where: { id_offer: offerId } }) as unknown as BidModel[]
  }
}
