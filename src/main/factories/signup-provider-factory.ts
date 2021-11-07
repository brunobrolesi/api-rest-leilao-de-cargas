import { PrismaClient } from '.prisma/client'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountProviderPostgresRepository } from '../../infra/db/postgresql/account-provider/account-provider-repository'
import { SignUpController } from '../../presentation/controllers/signup/signup-controller'
import { SignUpValidator } from '../../utils/validators/signup-request-body'

export const makeProviderSignUpController = (): SignUpController => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const prima = new PrismaClient()
  const addAccountRepository = new AccountProviderPostgresRepository(prima)
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signUpBodyValidator = new SignUpValidator()
  return new SignUpController(signUpBodyValidator, addAccount)
}
