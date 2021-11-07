import { SignUpValidator } from './signup-request-body'

const makeSut = (): SignUpValidator => {
  return new SignUpValidator()
}

describe('SignUpValidator', () => {
  it('Should return an error if email is not provided', () => {
    const sut = makeSut()
    const body = {
      password: 'valid_password',
      name: 'valid_name',
      doc: 'valid_doc',
      about: 'valid_about',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if email is invalid', () => {
    const sut = makeSut()
    const body = {
      email: 'invalid_email',
      password: 'valid_password',
      name: 'valid_name',
      doc: 'valid_doc',
      about: 'valid_about',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if password is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      name: 'valid_name',
      doc: 'valid_doc',
      about: 'valid_about',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if name is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      password: 'valid_password',
      doc: 'valid_doc',
      about: 'valid_about',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if doc is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      about: 'valid_about',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if doc is invalid', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: 'invalid_doc',
      about: 'valid_about',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if about is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '60.429.484/0001-10',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an error if site is not provided', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '60.429.484/0001-10',
      about: 'valid_about'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeTruthy()
  })

  it('Should return an empty object on successes', () => {
    const sut = makeSut()
    const body = {
      email: 'email@mail.com',
      password: 'valid_password',
      name: 'valid_name',
      doc: '60.429.484/0001-10',
      about: 'valid_about',
      site: 'valid_site'
    }
    const result = sut.isValid(body)
    expect(result.error).toBeFalsy()
  })
})
