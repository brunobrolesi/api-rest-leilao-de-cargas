import { OfferModel } from '../../../domain/models/offer'
import { LoadAllOffers } from '../../../domain/usecases/load-all-offers'
import { LoadAllOffersRepository } from '../../protocols/db/load-all-offers-repository'

export class DbLoadOffers implements LoadAllOffers {
  constructor (
    private readonly loadAllOffersRepository: LoadAllOffersRepository
  ) {}

  async load (): Promise<OfferModel[]> {
    return await this.loadAllOffersRepository.loadAll()
  }
}
