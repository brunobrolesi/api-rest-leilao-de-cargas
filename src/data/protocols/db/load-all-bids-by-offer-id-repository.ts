import { BidModel } from '../../../domain/models/bid'

export interface LoadAllBidsByOfferIdRepository {
  loadAllByOfferId: (offerId: number) => Promise<BidModel[]|[]>
}
