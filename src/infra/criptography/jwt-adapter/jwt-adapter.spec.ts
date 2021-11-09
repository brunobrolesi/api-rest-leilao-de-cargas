import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenData } from '../../../data/protocols/criptography/token-generator'
import { JwtAdapter } from './jwt-adapter'

const makeSut = (): JwtAdapter => {
  const secret = 'secret'
  return new JwtAdapter(secret)
}

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  },
  verify (): JwtPayload {
    return {
      id: 1,
      email: 'any_email',
      role: 'any:role'
    }
  }
}))

const makeTokenData = (): TokenData => ({
  id: 1,
  email: 'any_email@mail.com',
  role: 'any_role'
})

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.generate(makeTokenData())
    const jwtConfig = {
      expiresIn: '2h',
      algorithm: 'HS256'
    }
    expect(signSpy).toHaveBeenCalledWith({ id: 1, email: 'any_email@mail.com', role: 'any_role' }, 'secret', jwtConfig)
  })

  it('Should return a token on sign success', async () => {
    const sut = makeSut()
    const token = sut.generate(makeTokenData())
    expect(token).toBe('any_token')
  })

  it('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    expect(() => sut.generate(makeTokenData())).toThrow()
  })

  it('Should call verify with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'verify')
    sut.verify('any_token')
    expect(signSpy).toHaveBeenCalledWith('any_token', 'secret')
  })

  it('Should return a token payload on verify success', async () => {
    const sut = makeSut()
    const token = sut.verify('any_token')
    expect(token).toEqual({
      id: 1,
      email: 'any_email',
      role: 'any:role'
    })
  })

  it('Should throw if verify throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
    expect(() => sut.verify('any_token')).toThrow()
  })
})
