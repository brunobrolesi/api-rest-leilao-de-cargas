import { PrismaClient } from '.prisma/client'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountPostgresRepository } from '../../infra/db/postgresql/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup'
import { SignUpValidator } from '../../utils/validators/signup-request-body'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const prima = new PrismaClient()
  const addAccountRepository = new AccountPostgresRepository(prima)
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signUpBodyValidator = new SignUpValidator()
  return new SignUpController(signUpBodyValidator, addAccount)
}
