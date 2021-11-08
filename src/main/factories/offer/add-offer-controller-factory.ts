import { PrismaClient } from '.prisma/client'
import { DbAddOffer } from '../../../data/usecases/add-offer/db-add-offer'
import { OfferPostgresRepository } from '../../../infra/db/postgresql/offer/offer-repository'
import { AddOfferController } from '../../../presentation/controllers/offer/add-offer/add-offer-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { OfferPostValidator } from '../../../utils/validators/offer/offer-post-request-body'

export const makeAddOfferController = (): Controller => {
  const prisma = new PrismaClient()
  const addOfferRepository = new OfferPostgresRepository(prisma)
  const addOffer = new DbAddOffer(addOfferRepository)
  const addOfferBodyValidator = new OfferPostValidator()
  return new AddOfferController(addOfferBodyValidator, addOffer)
}
