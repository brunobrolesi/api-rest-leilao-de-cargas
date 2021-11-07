import { PrismaClient } from '.prisma/client'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountProviderPostgresRepository } from '../../../infra/db/postgresql/account-provider/account-provider-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { LoginValidator } from '../../../utils/validators/login/login-request-body'
import { env } from '../../config/env'

export const makeProviderLoginController = (): Controller => {
  const prisma = new PrismaClient()
  const loadAccountRepository = new AccountProviderPostgresRepository(prisma)
  const salt = 12
  const hashComparer = new BcryptAdapter(salt)
  const tokenGenerator = new JwtAdapter(env.jwtSecret)
  const loginBodyValidator = new LoginValidator()
  const authentication = new DbAuthentication(loadAccountRepository, hashComparer, tokenGenerator)
  return new LoginController(loginBodyValidator, authentication)
}
