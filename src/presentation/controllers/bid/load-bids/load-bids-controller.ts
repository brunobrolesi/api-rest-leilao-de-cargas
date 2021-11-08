import { LoadAllOfferBids } from '../../../../domain/usecases/load-all-offer-bids'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoadBidsController implements Controller {
  constructor (
    private readonly loadAllOffersBids: LoadAllOfferBids
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const numberId = Number(id)
      const bids = await this.loadAllOffersBids.load(numberId)
      return ok(bids)
    } catch (error) {
      return serverError()
    }
  }
}
