import { MissingAuthToken } from '../errors/missing-auth-token'
import { forbidden, ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = httpRequest.headers?.authorization

    if (!token) return forbidden(new MissingAuthToken())

    return ok(null)
  }
}
