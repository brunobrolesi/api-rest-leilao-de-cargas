export const providersSignUpPath = {
  post: {
    tags: ['Login'],
    summary: 'Rota de Cadastro para Transportadores',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpRequestBody'
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
              $ref: '#/schemas/signUpRequestBody'
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
