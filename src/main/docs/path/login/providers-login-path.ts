export const providersLoginPath = {
  post: {
    tags: ['Login'],
    summary: 'Rota de Autenticação para Transportadores',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginRequestBody'
          },
          example: {
            email: 'email@mail.com',
            password: 'valid_password'
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
