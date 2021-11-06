import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { BodyValidator } from '../protocols/body-validator'

export class LoginController implements Controller {
  private readonly loginBodyValidator: BodyValidator

  constructor (loginBodyValidator: BodyValidator) {
    this.loginBodyValidator = loginBodyValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const { error } = this.loginBodyValidator.isValid(body)
      if (error) return badRequest(error)

      return ok('ok')
    } catch (error) {
      return serverError()
    }
  }
}
