import { AddBid } from '../../../domain/usecases/add-bid'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { BodyValidator } from '../../protocols/body-validator'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddBidController implements Controller {
  constructor (
    private readonly addBidBodyValidator: BodyValidator,
    private readonly addBid: AddBid
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const { error } = this.addBidBodyValidator.isValid(body)
      if (error) return badRequest(error)

      const {
        id_provider,
        id_offer,
        value,
        amount
      } = body

      await this.addBid.add({
        id_provider,
        id_offer,
        value,
        amount
      })

      return created(null)
    } catch (error) {
      return serverError()
    }
  }
}
