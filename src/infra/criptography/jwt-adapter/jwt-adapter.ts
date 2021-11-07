import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenData, TokenGenerator } from '../../../data/protocols/criptography/token-generator'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  generate (data: TokenData): string {
    const jwtConfig: SignOptions = {
      expiresIn: '2h',
      algorithm: 'HS256'
    }

    return jwt.sign(data, this.secret, jwtConfig)
  }
}
