import { PrismaClient } from '.prisma/client'
import { DbLoadAccounts } from '../../../data/usecases/load-account/db-load-accounts'
import { AccountProviderPostgresRepository } from '../../../infra/db/postgresql/account-provider/account-provider-repository'
import { LoadAccountsController } from '../../../presentation/controllers/account/load-account/load-account-controller'
import { Controller } from '../../../presentation/protocols/controller'

export const makeLoadProviderAccountsController = (): Controller => {
  const prisma = new PrismaClient()
  const loadAllAccountsRepository = new AccountProviderPostgresRepository(prisma)
  const loadAccounts = new DbLoadAccounts(loadAllAccountsRepository)
  return new LoadAccountsController(loadAccounts)
}
