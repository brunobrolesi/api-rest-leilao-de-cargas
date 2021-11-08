export class InvalidAuthToken extends Error {
  constructor () {
    super('Invalid auth token')
    this.name = 'InvalidAuthToken'
  }
}
