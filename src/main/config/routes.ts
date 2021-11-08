import { Express } from 'express'
import loginRouter from '../routes/login/login-routes'
import offersRouter from '../routes/offer/offer-routes'
import bidsRouter from '../routes/bid/bid-routes'
import accountsRouter from '../routes/account/account-routes'

export default (app: Express): void => {
  app.use(loginRouter)
  app.use(offersRouter)
  app.use(bidsRouter)
  app.use(accountsRouter)
}
