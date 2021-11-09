export const customersSignUpPath = {
  post: {
    tags: ['Login'],
    summary: 'Rota de Cadastro para Embarcadores',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpRequestBody'
          },
          example: {
            email: 'email@mail.com',
            password: 'valid_password',
            name: 'valid_name',
            doc: '60.429.484/0001-10',
            about: 'valid_about',
            site: 'valid_site'
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
              $ref: '#/schemas/signUpResponseBody'
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
