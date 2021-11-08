import { PrismaClient } from '.prisma/client'
import { DbAddBid } from '../../../data/usecases/add-bid/db-add-bid'
import { BidPostgresRepository } from '../../../infra/db/postgresql/bid/bid-repository'
import { OfferPostgresRepository } from '../../../infra/db/postgresql/offer/offer-repository'
import { AddBidController } from '../../../presentation/controllers/bid/add-bid/add-bid-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { BidPostValidator } from '../../../utils/validators/bid/bid-post-request-body'

export const makeAddBidController = (): Controller => {
  const prisma = new PrismaClient()
  const addBidRepository = new BidPostgresRepository(prisma)
  const loadOfferByIdRepository = new OfferPostgresRepository(prisma)
  const addBid = new DbAddBid(loadOfferByIdRepository, addBidRepository)
  const addBidBodyValidator = new BidPostValidator()
  return new AddBidController(addBidBodyValidator, addBid)
}
