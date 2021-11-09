export const signUpRequestBodySchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    doc: {
      type: 'string'
    },
    about: {
      type: 'string'
    },
    site: {
      type: 'string'
    },
    active: 'boolean'
  }
}
