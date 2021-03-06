import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly role: string
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string|null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (!account) return null

    const isValidPassword = await this.hashComparer.compare(authentication.password, account.password)

    if (!isValidPassword) return null

    const { id, email } = account
    const role = this.role
    return await this.tokenGenerator.generate({ id, email, role })
  }
}
