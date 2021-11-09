export const customersPath = {
  get: {
    tags: ['Accounts'],
    summary: 'Rota para obtenção dos Embarcadores cadastrados',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accountGetResponseBody'
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
