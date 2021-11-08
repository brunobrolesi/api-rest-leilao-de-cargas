import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { BodyValidator } from '../../../protocols/body-validator'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class AddOfferController implements Controller {
  constructor (private readonly addOfferBodyValidator: BodyValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const { error } = this.addOfferBodyValidator.isValid(body)
      if (error) return badRequest(error)
      return ok('')
    } catch (error) {
      return serverError()
    }
  }
}
