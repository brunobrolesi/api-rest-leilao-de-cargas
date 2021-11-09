import { AddOffer } from '../../../../domain/usecases/add-offer'
import { badRequest, created, serverError } from '../../../helpers/http-helper'
import { BodyValidator } from '../../../protocols/body-validator'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class AddOfferController implements Controller {
  constructor (
    private readonly addOfferBodyValidator: BodyValidator,
    private readonly addOffer: AddOffer
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const { error } = this.addOfferBodyValidator.isValid(body)
      if (error) return badRequest(error)

      const {
        id_customer,
        from,
        to,
        initial_value,
        amount,
        amount_type
      } = body

      const id = await this.addOffer.add({
        id_customer,
        from,
        to,
        initial_value,
        amount,
        amount_type
      })

      return created(id)
    } catch (error) {
      return serverError()
    }
  }
}
