import { TokenVerifier } from '../../data/protocols/criptography/token-verifier'
import { MissingAuthToken } from '../errors/missing-auth-token'
import { forbidden, ok, unauthorized } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly tokenVerifier: TokenVerifier,
    private readonly role: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = httpRequest.headers?.authorization

    if (!token) return forbidden(new MissingAuthToken())

    const { role } = await this.tokenVerifier.verify(token)

    if (this.role !== role) return unauthorized()

    return ok(null)
  }
}
