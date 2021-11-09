export const bidsPostRequestBodySchema = {
  type: 'object',
  properties: {
    id_offer: {
      type: 'integer'
    },
    value: {
      type: 'number',
      format: 'float'
    },
    amount: {
      type: 'number',
      format: 'float'
    }
  },
  required: ['id_provider', 'id_offer', 'value', 'amount']
}
