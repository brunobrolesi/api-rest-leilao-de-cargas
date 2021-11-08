import { AddOffer, AddOfferModel, OfferId } from '../../../domain/usecases/add-offer'
import { AddOfferRepository } from '../../protocols/db/add-offer-repository'

export class DbAddOffer implements AddOffer {
  constructor (
    private readonly addOfferRepository: AddOfferRepository
  ) {}

  async add (offerData: AddOfferModel): Promise<OfferId> {
    const { id } = await this.addOfferRepository.add(offerData)
    return { id }
  }
}
