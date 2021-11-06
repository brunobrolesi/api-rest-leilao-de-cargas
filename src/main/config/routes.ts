import { Express } from 'express'
import signUpRouter from '../routes/signup-routes'

export default (app: Express): void => {
  app.use(signUpRouter)
}
