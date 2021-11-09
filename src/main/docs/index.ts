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
import { BidsPath } from './path/bids/bids-path'
import { bidsPostRequestBodySchema } from './schemas/bids/bids-post-request-body-schema'
import { accountsGetResponseBodySchema } from './schemas/accounts/account-get-response-body'
import { customersPath } from './path/accounts/customers'
import { providersPath } from './path/accounts/providers'
import { bidsGetResponseBodySchema } from './schemas/bids/bids-get-response-body-schema'
import { signUpResponseBodySchema } from './schemas/login/signup-response-body-shema'
import { BidsInOfferPath } from './path/bids/bids-in-offer-path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API REST TRANSPORTE DE CARGAS',
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
    '/offers': OfferPath,
    '/bids': BidsPath,
    '/bids/{offerId}': BidsInOfferPath,
    '/customers': customersPath,
    '/providers': providersPath
  },
  schemas: {
    error: errorSchema,
    loginResponseBody: loginResponseBodySchema,
    loginRequestBody: loginRequestBodySchema,
    signUpRequestBody: signUpRequestBodySchema,
    signUpResponseBody: signUpResponseBodySchema,
    offersPostRequestBody: offersPostRequestBodySchema,
    offersPostResponseBody: offersPostResponseBodySchema,
    offersGetResponseBody: offersGetResponseBodySchema,
    bidsPostRequestBody: bidsPostRequestBodySchema,
    bidsPostResponseBody: bidsPostRequestBodySchema,
    bidsGetResponseBody: bidsGetResponseBodySchema,
    accountGetResponseBody: accountsGetResponseBodySchema
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
