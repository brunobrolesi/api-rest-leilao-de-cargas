import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeLoadCustomerAccountsController } from '../../factories/account/load-customer-accounts-factory'
import { makeLoadProviderAccountsController } from '../../factories/account/load-provider-accounts-factory'

const router = Router()

router.get('/customers', adaptRoute(makeLoadCustomerAccountsController()))

router.get('/providers', adaptRoute(makeLoadProviderAccountsController()))

export default router
