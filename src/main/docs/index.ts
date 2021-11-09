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
import { OfferPath } from './path/offers/offers-path'
import { offersPostRequestBodySchema } from './schemas/offers/offers-post-request-body-schema'
import { offersPostResponseBodySchema } from './schemas/offers/offers-post-response-body-schema'
import { offersGetResponseBodySchema } from './schemas/offers/offers-get-response-body-schema'
import { apiKeyAuthSchema } from './schemas/api-key-auth-schema'

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
  }, {
    name: 'Offers'
  }, {
    name: 'Bids'
  },
  {
    name: 'Accounts'
  }],
  paths: {
    '/customers/signup': customersSignUpPath,
    '/providers/signup': providersSignUpPath,
    '/customers/login': customersLoginPath,
    '/providers/login': providersLoginPath,
    '/offers': OfferPath
  },
  schemas: {
    error: errorSchema,
    loginResponseBody: loginResponseBodySchema,
    loginRequestBody: loginRequestBodySchema,
    signUpRequestBody: signUpRequestBodySchema,
    signUpResponseBody: signUpRequestBodySchema,
    offersPostRequestBody: offersPostRequestBodySchema,
    offersPostResponseBody: offersPostResponseBodySchema,
    offersGetResponseBody: offersGetResponseBodySchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest: badRequest,
    forbidden: forbidden,
    serverError: serverError,
    unauthorized: unauthorized
  }
}
