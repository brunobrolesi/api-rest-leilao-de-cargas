import { ResumedAccountModel } from '../../../domain/models/account'
import { LoadAllAccounts } from '../../../domain/usecases/load-all-accounts'
import { LoadAllAccountsRepository } from '../../protocols/db/load-all-accounts-repository'

export class DbLoadAccounts implements LoadAllAccounts {
  constructor (
    private readonly loadAllAccountsRepository: LoadAllAccountsRepository
  ) {}

  async load (): Promise<ResumedAccountModel[]> {
    return await this.loadAllAccountsRepository.loadAll()
  }
}
