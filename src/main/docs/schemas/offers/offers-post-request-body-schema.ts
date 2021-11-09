export const offersPostRequestBodySchema = {
  type: 'object',
  properties: {
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
  },
  required: ['id_customer', 'from', 'to', 'initial_value', 'amount', 'amount_type']
}
