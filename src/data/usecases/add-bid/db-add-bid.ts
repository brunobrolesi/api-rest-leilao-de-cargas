import { AddBid, AddBidModel, BidId } from '../../../domain/usecases/add-bid'
import { AddBidRepository } from '../../protocols/db/add-bid-repository'
import { LoadOfferByIdRepository } from '../../protocols/db/load-offer-by-id-repository'

export class DbAddBid implements AddBid {
  constructor (
    private readonly loadOfferByIdRepository: LoadOfferByIdRepository,
    private readonly addBidRepository: AddBidRepository
  ) {}

  async add (bidData: AddBidModel): Promise<BidId|null> {
    const offer = await this.loadOfferByIdRepository.loadById(bidData.id_offer)

    if (!offer) return null

    if (offer.amount < bidData.amount) return null

    const { id } = await this.addBidRepository.add(bidData)

    return { id: id }
  }
}
