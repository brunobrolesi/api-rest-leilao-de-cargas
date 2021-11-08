import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenData, TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import { TokenPayload, TokenVerifier } from '../../../data/protocols/criptography/token-verifier'

export class JwtAdapter implements TokenGenerator, TokenVerifier {
  constructor (private readonly secret: string) {}

  generate (data: TokenData): string {
    const jwtConfig: SignOptions = {
      expiresIn: '2h',
      algorithm: 'HS256'
    }

    return jwt.sign(data, this.secret, jwtConfig)
  }

  verify (token: string): TokenPayload {
    const payload = jwt.verify(token, this.secret)
    return payload as TokenPayload
  }
}
