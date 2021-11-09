import { prismaMock } from '../../../../../singleton'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { AccountProviderPostgresRepository } from './account-provider-repository'

const makeSut = (): AccountProviderPostgresRepository => {
  return new AccountProviderPostgresRepository(prismaMock)
}

const makeProviderFakeAccount = (): AddAccountModel => ({
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  doc: 'any_doc',
  about: 'any_about',
  site: 'any_site'
})

const makeFakeAccountModel = (): AccountModel => ({
  id: 1,
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  doc: 'any_doc',
  about: 'any_about',
  site: 'any_site',
  active: true
})

describe('Account Provider PostgreSQL Repository', () => {
  it('Should call prisma client with correct values', async () => {
    const sut = makeSut()
    const spyCreate = jest.spyOn(prismaMock.provider, 'create')
    await sut.add(makeProviderFakeAccount())

    expect(spyCreate).toHaveBeenCalledWith({
      data: {
        email: 'any_email',
        password: 'any_password',
        name: 'any_name',
        doc: 'any_doc',
        about: 'any_about',
        site: 'any_site'
      }
    })
  })

  it('Should return an account on add success', async () => {
    const sut = makeSut()
    prismaMock.provider.create.mockResolvedValueOnce(makeFakeAccountModel())

    const account = await sut.add(makeProviderFakeAccount())

    expect(account).toEqual(makeFakeAccountModel())
  })

  it('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    prismaMock.provider.findUnique.mockResolvedValueOnce(makeFakeAccountModel())

    const account = await sut.loadByEmail('any_email')

    expect(account).toEqual({
      id: 1,
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      doc: 'any_doc',
      about: 'any_about',
      site: 'any_site',
      active: true
    })
  })

  it('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    prismaMock.provider.findUnique.mockResolvedValueOnce(null)

    const account = await sut.loadByEmail('any_email')

    expect(account).toBeNull()
  })
})
