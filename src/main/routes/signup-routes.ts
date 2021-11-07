import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCustomerSignUpController } from '../factories/signup-customer'
import { makeProviderSignUpController } from '../factories/signup-provider'

const router = Router()

router.post('/customers/signup', adaptRoute(makeCustomerSignUpController()))
router.post('/providers/signup', adaptRoute(makeProviderSignUpController()))

export default router
