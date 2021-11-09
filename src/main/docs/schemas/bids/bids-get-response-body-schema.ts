export const bidsGetResponseBodySchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id_provider: {
        type: 'integer'
      },
      id_offer: {
        type: 'integer'
      },
      value: {
        type: 'string'
      },
      amount: {
        type: 'string'
      }
    }
  }

}
