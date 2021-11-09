export const OfferPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Offers'],
    summary: 'Rota para Embarcadores realizarem o cadastro de ofertas',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/offersPostRequestBody'
          },
          example: {
            from: 'São Paulo - SP',
            to: 'Rio de Janeiro - RJ',
            initial_value: 10000,
            amount: 50000,
            amount_type: 'KG'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/offersPostResponseBody'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    tags: ['Offers'],
    summary: 'Rota para obtenção das ofertas cadastradas',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/offersGetResponseBody'
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
