import { customersLoginPath } from './path/login/customers-login-path'
import { loginResponseBodySchema } from './schemas/login/login-response-schema'
import { loginRequestBodySchema } from './schemas/login/login-request-body-schema'
import { badRequest } from './components/bad-request'
import { errorSchema } from './schemas/error-schema'
import { forbidden } from './components/forbidden'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { providersLoginPath } from './path/login/providers-login-path'
import { signUpRequestBodySchema } from './schemas/login/signup-request-body-shema'
import { customersSignUpPath } from './path/login/customers-signup-path'
import { providersSignUpPath } from './path/login/providers-signup-path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Teste BackEnd GoFlux',
    description: 'API REST capaz de cadastrar e obter informações de Embarcadores, Transportadores, Ofertas e Lances',
    version: '1.0.0'
  },
  servers: [{
    url: '/'
  }],
  tag: [{
    name: 'Login'
  }],
  paths: {
    '/customers/signup': customersSignUpPath,
    '/providers/signup': providersSignUpPath,
    '/customers/login': customersLoginPath,
    '/providers/login': providersLoginPath
  },
  schemas: {
    error: errorSchema,
    loginResponseBody: loginResponseBodySchema,
    loginRequestBody: loginRequestBodySchema,
    signUpRequestBody: signUpRequestBodySchema,
    signUpResponseBody: signUpRequestBodySchema
  },
  components: {
    badRequest: badRequest,
    forbidden: forbidden,
    serverError: serverError,
    unauthorized: unauthorized
  }
}
