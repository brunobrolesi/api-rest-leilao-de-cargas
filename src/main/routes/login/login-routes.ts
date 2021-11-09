import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCustomerLoginController } from '../../factories/login/login-customer-factory'
import { makeProviderLoginController } from '../../factories/login/login-provider-factory'
import { makeCustomerSignUpController } from '../../factories/signup/signup-customer-factory'
import { makeProviderSignUpController } from '../../factories/signup/signup-provider-factory'

const router = Router()

router.post('/customers/signup', adaptRoute(makeCustomerSignUpController()))
router.post('/customers/login', adaptRoute(makeCustomerLoginController()))

router.post('/providers/signup', adaptRoute(makeProviderSignUpController()))
router.post('/providers/login', adaptRoute(makeProviderLoginController()))

export default router
