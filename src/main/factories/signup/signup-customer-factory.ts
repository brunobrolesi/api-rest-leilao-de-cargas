import { PrismaClient } from '.prisma/client'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountCustomerPostgresRepository } from '../../../infra/db/postgresql/account-customer/account-customer-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { SignUpValidator } from '../../../utils/validators/signup-request-body'

export const makeCustomerSignUpController = (): SignUpController => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const prima = new PrismaClient()
  const addAccountRepository = new AccountCustomerPostgresRepository(prima)
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const signUpBodyValidator = new SignUpValidator()
  return new SignUpController(signUpBodyValidator, addAccount)
}
