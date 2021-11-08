import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../../presentation/protocols/middleware'
import { env } from '../../config/env'

export const makeAuthMiddleware = (role: string): Middleware => {
  const tokenVerifier = new JwtAdapter(env.jwtSecret)
  return new AuthMiddleware(tokenVerifier, role)
}
