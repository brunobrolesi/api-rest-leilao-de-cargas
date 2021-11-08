import { BidModel } from '../models/bid'

export interface LoadAllOfferBids {
  load: (offerId: number) => Promise<BidModel[]>
}
