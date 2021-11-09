import { OfferModel } from '../../../domain/models/offer'
import { AddOfferModel } from '../../../domain/usecases/add-offer'

export interface AddOfferRepository {
  add: (offerData: AddOfferModel) => Promise<OfferModel>
}
