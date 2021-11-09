export const serverError = {
  description: 'Error interno no servidor',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
