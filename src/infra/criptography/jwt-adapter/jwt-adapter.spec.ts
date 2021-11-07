import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

const makeSut = (): JwtAdapter => {
  const secret = 'secret'
  return new JwtAdapter(secret)
}

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.generate(1)
    expect(signSpy).toHaveBeenCalledWith({ id: 1 }, 'secret')
  })

  it('Should return a token on sign success', async () => {
    const sut = makeSut()
    const token = sut.generate(1)
    expect(token).toBe('any_token')
  })

  it('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    expect(() => sut.generate(1)).toThrow()
  })
})
