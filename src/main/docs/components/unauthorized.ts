export const unauthorized = {
  description: 'Permissão insuficiente',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
