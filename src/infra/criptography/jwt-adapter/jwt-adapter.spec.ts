import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

const makeSut = (): JwtAdapter => {
  const secret = 'secret'
  return new JwtAdapter(secret)
}

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(1)
    expect(signSpy).toHaveBeenCalledWith({ id: 1 }, 'secret')
  })
})
