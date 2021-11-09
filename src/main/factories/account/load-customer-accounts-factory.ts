import { PrismaClient } from '.prisma/client'
import { DbLoadAccounts } from '../../../data/usecases/load-account/db-load-accounts'
import { AccountCustomerPostgresRepository } from '../../../infra/db/postgresql/account-customer/account-customer-repository'
import { LoadAccountsController } from '../../../presentation/controllers/account/load-account/load-account-controller'
import { Controller } from '../../../presentation/protocols/controller'

export const makeLoadCustomerAccountsController = (): Controller => {
  const prisma = new PrismaClient()
  const loadAllAccountsRepository = new AccountCustomerPostgresRepository(prisma)
  const loadAccounts = new DbLoadAccounts(loadAllAccountsRepository)
  return new LoadAccountsController(loadAccounts)
}
