import { BidPostValidator } from './bid-post-request-body'

const makeSut = (): BidPostValidator => {
  return new BidPostValidator()
}

describe('BidPostValidator', () => {
  it('Should return an error if id_provider is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'any_emal@mail.com',
      id_offer: 1,
      value: 100,
      amount: 100
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if email is not provided', () => {
    const sut = makeSut()
    const body = {
      id_provider: 1,
      id_offer: 1,
      value: 100,
      amount: 100
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if id_offer is not provided', () => {
    const sut = makeSut()
    const body = {
      id_provider: 1,
      email: 'any_emal@mail.com',
      value: 100,
      amount: 100
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if value is not provided', () => {
    const sut = makeSut()
    const body = {
      id_provider: 1,
      email: 'any_emal@mail.com',
      id_offer: 1,
      amount: 100
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if amount is not provided', () => {
    const sut = makeSut()
    const body = {
      id_provider: 1,
      email: 'any_emal@mail.com',
      id_offer: 1,
      value: 100
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an empty object on successes', () => {
    const sut = makeSut()
    const body = {
      id_provider: 1,
      email: 'any_emal@mail.com',
      id_offer: 1,
      value: 100,
      amount: 100
    }
    const result = sut.isValid(body)
    expect(result.error).toBeFalsy()
  })
})
