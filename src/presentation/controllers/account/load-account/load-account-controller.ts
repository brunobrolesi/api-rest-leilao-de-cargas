import { LoadAllAccounts } from '../../../../domain/usecases/load-all-accounts'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoadAccountsController implements Controller {
  constructor (
    private readonly loadAllAccounts: LoadAllAccounts
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accounts = await this.loadAllAccounts.load()
      return ok(accounts)
    } catch (error) {
      return serverError()
    }
  }
}
