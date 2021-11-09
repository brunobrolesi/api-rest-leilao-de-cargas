import { LoginValidator } from './login-request-body'

const makeSut = (): LoginValidator => {
  return new LoginValidator()
}

describe('LoginValidator', () => {
  it('Should return an error if email is not provided', () => {
    const sut = makeSut()
    const body = {
      password: 'valid_password'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if email is invalid', () => {
    const sut = makeSut()
    const body = {
      email: 'invalid_email',
      password: 'valid_password'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if password is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an empty object on successes', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      password: 'valid_password'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeFalsy()
  })
})
