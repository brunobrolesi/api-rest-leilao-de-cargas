export const signUpResponseBodySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
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
    active: {
      type: 'boolean'
    }
  }
}
