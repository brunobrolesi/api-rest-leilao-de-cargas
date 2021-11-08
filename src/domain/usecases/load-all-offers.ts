import { OfferModel } from '../models/offer'

export interface LoadAllOffers {
  load: () => Promise<OfferModel[]>
}
