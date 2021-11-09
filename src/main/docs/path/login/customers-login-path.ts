export const customersLoginPath = {
  post: {
    tags: ['Login'],
    summary: 'Rota de Autenticação para Embarcadores',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginRequestBody'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/loginResponseBody'
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
  }
}
