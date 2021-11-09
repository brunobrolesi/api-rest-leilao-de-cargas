import { PrismaClient } from '.prisma/client'
import { DbLoadBids } from '../../../data/usecases/load-bid/db-load-bids'
import { BidPostgresRepository } from '../../../infra/db/postgresql/bid/bid-repository'
import { LoadBidsController } from '../../../presentation/controllers/bid/load-bids/load-bids-controller'
import { Controller } from '../../../presentation/protocols/controller'

export const makeLoadBidsController = (): Controller => {
  const prisma = new PrismaClient()
  const loadAllBidsByOfferIdRepository = new BidPostgresRepository(prisma)
  const loadAllOffersBids = new DbLoadBids(loadAllBidsByOfferIdRepository)
  return new LoadBidsController(loadAllOffersBids)
}
