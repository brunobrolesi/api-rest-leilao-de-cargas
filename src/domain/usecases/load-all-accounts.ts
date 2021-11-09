import { ResumedAccountModel } from '../models/account'

export interface LoadAllAccounts {
  load: () => Promise<ResumedAccountModel[]>
}
