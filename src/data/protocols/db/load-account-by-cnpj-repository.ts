import { AccountModel } from '../../../domain/models/account'

export interface LoadAccountByCnpjRepository {
  loadByCnpj: (cnpj: string) => Promise<AccountModel|null>
}
