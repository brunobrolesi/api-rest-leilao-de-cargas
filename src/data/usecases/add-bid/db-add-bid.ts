import { AddBid, AddBidModel } from '../../../domain/usecases/add-bid'
import { AddBidRepository } from '../../protocols/db/add-bid-repository'
import { LoadOfferByIdRepository } from '../../protocols/db/load-offer-by-id-repository'

export class DbAddBid implements AddBid {
  constructor (
    private readonly loadOfferByIdRepository: LoadOfferByIdRepository,
    private readonly addBidRepository: AddBidRepository
  ) {}

  async add (bidData: AddBidModel): Promise<void> {
    const offer = await this.loadOfferByIdRepository.loadById(bidData.id_offer)

    if (!offer) throw new Error('Invalid Offer Id')

    if (offer.amount < bidData.amount) throw new Error('Invalid amount value')

    await this.addBidRepository.add(bidData)
  }
}
