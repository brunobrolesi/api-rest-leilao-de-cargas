import { OfferPostValidator } from './offer-post-request-body'

const makeSut = (): OfferPostValidator => {
  return new OfferPostValidator()
}

describe('OfferPostValidator', () => {
  it('Should return an error if id_customer is not provided', () => {
    const sut = makeSut()
    const body = {
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'KG'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if from is not provided', () => {
    const sut = makeSut()
    const body = {
      id_customer: 1,
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'KG'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if to is not provided', () => {
    const sut = makeSut()
    const body = {
      id_customer: 1,
      from: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'KG'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if initial_value is not provided', () => {
    const sut = makeSut()
    const body = {
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      amount: 100,
      amount_type: 'KG'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if amount is not provided', () => {
    const sut = makeSut()
    const body = {
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount_type: 'KG'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if amount_type is not provided', () => {
    const sut = makeSut()
    const body = {
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if amount_type is invalid', () => {
    const sut = makeSut()
    const body = {
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'invalid'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an empty object on successes', () => {
    const sut = makeSut()
    const body = {
      id_customer: 1,
      from: 'any_location',
      to: 'any_location',
      initial_value: 100,
      amount: 100,
      amount_type: 'TON'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeFalsy()
  })
})
