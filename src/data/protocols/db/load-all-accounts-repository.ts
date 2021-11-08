import { ResumedAccountModel } from '../../../domain/models/account'

export interface LoadAllAccountsRepository {
  loadAll: () => Promise<ResumedAccountModel[]|[]>
}
