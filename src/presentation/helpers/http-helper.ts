import { ServerError } from '../errors/server-error'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message
  }
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: { error: new UnauthorizedError().message }
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: { error: error.message }
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: { error: new ServerError().message }
})
