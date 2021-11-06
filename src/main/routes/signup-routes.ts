import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup'

const router = Router()

router.post('/signup', adaptRoute(makeSignUpController()))

export default router
