import { HttpRequest } from '../protocols/http'
import { SignUpBodyValidator } from '../protocols/signup-body-validator'

export class SignUpController {
  private readonly signUpBodyValidator: SignUpBodyValidator

  constructor (signUpBodyValidator: SignUpBodyValidator) {
    this.signUpBodyValidator = signUpBodyValidator
  }

  handle (httpRequest: HttpRequest): any {
    const { body } = httpRequest
    this.signUpBodyValidator.isValid(body)
  }
}
