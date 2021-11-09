import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { LoadAccountByCnpjRepository } from '../../protocols/db/load-account-by-cnpj-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly loadAccountByCnpjRepository: LoadAccountByCnpjRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel|null> {
    const isEmailInUse = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (isEmailInUse) return null

    const isCnpjInUse = await this.loadAccountByCnpjRepository.loadByCnpj(accountData.email)
    if (isCnpjInUse) return null

    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
