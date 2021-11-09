export const accountsGetResponseBodySchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'integer'
      },
      name: {
        type: 'string'
      },
      doc: {
        type: 'string'
      }
    }
  }

}
