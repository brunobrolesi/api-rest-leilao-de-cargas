import { AccountModel } from '../models/account'

export interface AddAccountModel {
  email: string
  password: string
  name: string
  doc: string
  about: string
  site: string
  role: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
