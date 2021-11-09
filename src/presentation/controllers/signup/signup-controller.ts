import { AddAccount } from '../../../domain/usecases/add-account'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { BodyValidator } from '../../protocols/body-validator'

export class SignUpController implements Controller {
  constructor (
    private readonly signUpBodyValidator: BodyValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const { error } = this.signUpBodyValidator.isValid(body)
      if (error) return badRequest(error)

      const { email, password, name, doc, about, site } = body

      const account = await this.addAccount.add({ email, password, name, doc, about, site })

      if (!account) return badRequest(new Error('Email or Cnpj already in use'))

      return created(account)
    } catch (error) {
      return serverError()
    }
  }
}
