export const providersPath = {
  get: {
    tags: ['Accounts'],
    summary: 'Rota para obtenção das Transportadoras cadastradas',
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
