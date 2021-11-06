import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { BodyValidator } from '../protocols/body-validator'
import { Authentication } from '../../domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly loginBodyValidator: BodyValidator
  private readonly authentication: Authentication

  constructor (loginBodyValidator: BodyValidator, authentication: Authentication) {
    this.loginBodyValidator = loginBodyValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const { error } = this.loginBodyValidator.isValid(body)
      if (error) return badRequest(error)

      const { email, password } = body
      await this.authentication.auth(email, password)

      return ok('ok')
    } catch (error) {
      return serverError()
    }
  }
}
