import { Express } from 'express'
import loginRouter from '../routes/login/login-routes'
import offersRouter from '../routes/offer/offer-routes'

export default (app: Express): void => {
  app.use(loginRouter)
  app.use(offersRouter)
}
