import { TokenVerifier } from '../../data/protocols/criptography/token-verifier'
import { MissingAuthToken } from '../errors/missing-auth-token'
import { forbidden, ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (private readonly tokenVerifier: TokenVerifier) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = httpRequest.headers?.authorization

    if (!token) return forbidden(new MissingAuthToken())

    await this.tokenVerifier.verify(token)

    return ok(null)
  }
}
