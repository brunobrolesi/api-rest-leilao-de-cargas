import { PrismaClient } from '.prisma/client'
import { DbLoadOffers } from '../../../data/usecases/load-offer/db-load-offers'
import { OfferPostgresRepository } from '../../../infra/db/postgresql/offer/offer-repository'
import { LoadOffersController } from '../../../presentation/controllers/offer/load-offers/load-offers-controller'
import { Controller } from '../../../presentation/protocols/controller'

export const makeLoadOffersController = (): Controller => {
  const prisma = new PrismaClient()
  const LoadAllOffersRepository = new OfferPostgresRepository(prisma)
  const loadAllOffers = new DbLoadOffers(LoadAllOffersRepository)
  return new LoadOffersController(loadAllOffers)
}
