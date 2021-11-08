import { PrismaClient } from '.prisma/client'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { LoadAllAccountsRepository } from '../../../../data/protocols/db/load-all-accounts-repository'
import { AccountModel, ResumedAccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

export class AccountCustomerPostgresRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAllAccountsRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    return await this.prisma.customer.create({
      data: accountData
    })
  }

  async loadByEmail (email: string): Promise<AccountModel|null> {
    return await this.prisma.customer.findUnique({ where: { email } })
  }

  async loadAll (): Promise<ResumedAccountModel[]|[]> {
    return await this.prisma.customer.findMany({
      where: {
        active: true
      },
      select: {
        id: true,
        name: true,
        doc: true
      }
    })
  }
}
