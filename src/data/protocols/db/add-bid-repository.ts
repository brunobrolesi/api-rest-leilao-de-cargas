import { BidModel } from '../../../domain/models/bid'
import { AddBidModel } from '../../../domain/usecases/add-bid'

export interface AddBidRepository {
  add: (offerData: AddBidModel) => Promise<BidModel>
}
