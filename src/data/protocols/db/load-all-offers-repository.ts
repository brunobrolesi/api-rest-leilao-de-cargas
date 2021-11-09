import { OfferModel } from '../../../domain/models/offer'

export interface LoadAllOffersRepository {
  loadAll: () => Promise<OfferModel[]|[]>
}
