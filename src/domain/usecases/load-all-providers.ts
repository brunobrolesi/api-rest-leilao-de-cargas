import { ResumedAccountModel } from '../models/account'

export interface LoadAllProviders {
  load: () => Promise<ResumedAccountModel[]>
}
