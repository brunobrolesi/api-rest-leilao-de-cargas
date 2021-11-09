export const offersGetResponseBodySchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'integer'
      },
      id_customer: {
        type: 'integer'
      },
      from: {
        type: 'string'
      },
      to: {
        type: 'string'
      },
      initial_value: {
        type: 'number',
        format: 'float'
      },
      amount: {
        type: 'number',
        format: 'float'
      },
      amount_type: {
        type: 'string',
        pattern: '/(^KG$)|(^TON$)/'
      }
    }
  }

}
