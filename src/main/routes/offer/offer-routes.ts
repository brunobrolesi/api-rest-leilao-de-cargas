import { Router } from 'express'
import { adaptMiddleware } from '../../adapters/express-middleware-adapter'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeAuthMiddleware } from '../../factories/middlewares/auth-middleware-factory'
import { makeAddOfferController } from '../../factories/offer/offer-factory'

const router = Router()

const customerAuth = adaptMiddleware(makeAuthMiddleware('customer'))

router.post('/offers', customerAuth, adaptRoute(makeAddOfferController()))

export default router
