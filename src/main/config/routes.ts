import { Express } from 'express'
import loginRouter from '../routes/login/login-routes'

export default (app: Express): void => {
  app.use(loginRouter)
}
