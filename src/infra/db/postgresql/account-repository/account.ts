import { PrismaClient } from '.prisma/client'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

export class AccountPostgresRepository implements AddAccountRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { role, ...data } = accountData
    if (role === 'customer') {
      return await this.prisma.customer.create({
        data
      })
    }

    return await this.prisma.provider.create({
      data
    })
  }
}
