import { LoadAllOffers } from '../../../../domain/usecases/load-all-offers'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoadOffersController implements Controller {
  constructor (
    private readonly loadAllOffers: LoadAllOffers
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const offers = await this.loadAllOffers.load()
      return ok(offers)
    } catch (error) {
      return serverError()
    }
  }
}
