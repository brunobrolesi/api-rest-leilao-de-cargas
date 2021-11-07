import { PrismaClient } from '.prisma/client'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

export class AccountProviderPostgresRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    return await this.prisma.provider.create({
      data: accountData
    })
  }

  async loadByEmail (email: string): Promise<AccountModel|null> {
    return await this.prisma.provider.findUnique({ where: { email } })
  }
}
