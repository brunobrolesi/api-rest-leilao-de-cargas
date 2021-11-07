import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCustomerSignUpController } from '../factories/signup-customer-factory'
import { makeProviderSignUpController } from '../factories/signup-provider-factory'

const router = Router()

router.post('/customers/signup', adaptRoute(makeCustomerSignUpController()))
router.post('/providers/signup', adaptRoute(makeProviderSignUpController()))

export default router
