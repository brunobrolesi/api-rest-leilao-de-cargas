import { LoadAllProviders } from '../../../../domain/usecases/load-all-providers'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoadProvidersController implements Controller {
  constructor (
    private readonly loadAllProviders: LoadAllProviders
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const providers = await this.loadAllProviders.load()
      return ok(providers)
    } catch (error) {
      return serverError()
    }
  }
}
