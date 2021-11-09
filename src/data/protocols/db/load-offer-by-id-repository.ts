import { OfferModel } from '../../../domain/models/offer'

export interface LoadOfferByIdRepository {
  loadById: (id: number) => Promise<OfferModel|null>
}
