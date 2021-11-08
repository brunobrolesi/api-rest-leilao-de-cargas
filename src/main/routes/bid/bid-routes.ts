import { Router } from 'express'
import { adaptMiddleware } from '../../adapters/express-middleware-adapter'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware-factory'
import { makeAddBidController } from '../../factories/bid/add-bid-controller-factory'
import { makeLoadBidsController } from '../../factories/bid/load-bids-controller-factory'

const router = Router()

const customerAuth = adaptMiddleware(makeAuthMiddleware('provider'))

router.post('/bids', customerAuth, adaptRoute(makeAddBidController()))
router.post('/bids/:id', adaptRoute(makeLoadBidsController()))

export default router
