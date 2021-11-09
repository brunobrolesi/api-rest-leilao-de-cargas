export const forbidden = {
  description: 'Credenciais inválidas',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
