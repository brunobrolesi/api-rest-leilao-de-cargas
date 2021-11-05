import { HttpRequest, HttpResponse } from '../protocols/http'
import { SignUpBodyValidator } from '../protocols/signup-body-validator'

export class SignUpController {
  private readonly signUpBodyValidator: SignUpBodyValidator

  constructor (signUpBodyValidator: SignUpBodyValidator) {
    this.signUpBodyValidator = signUpBodyValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const { body: requestBody } = httpRequest
    const { error } = this.signUpBodyValidator.isValid(requestBody)
    if (error) return { statusCode: 400, body: {} }
  }
}
