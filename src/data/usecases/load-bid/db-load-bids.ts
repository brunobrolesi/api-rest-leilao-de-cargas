import { BidModel } from '../../../domain/models/bid'
import { LoadAllOfferBids } from '../../../domain/usecases/load-all-offer-bids'
import { LoadAllBidsByOfferIdRepository } from '../../protocols/db/load-all-bids-by-offer-id-repository'

export class DbLoadBids implements LoadAllOfferBids {
  constructor (
    private readonly loadAllBidsByOfferIdRepository: LoadAllBidsByOfferIdRepository
  ) {}

  async load (offerId: number): Promise<BidModel[]> {
    return await this.loadAllBidsByOfferIdRepository.loadAllByOfferId(offerId)
  }
}
