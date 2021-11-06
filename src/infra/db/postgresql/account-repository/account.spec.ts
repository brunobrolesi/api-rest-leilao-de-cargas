import { AccountPostgresRepository } from './account'
import { prismaMock } from '../../../../../singleton'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'

const makeSut = (): AddAccountRepository => {
  return new AccountPostgresRepository(prismaMock)
}

describe('Account PostgreSQL Repository', () => {
  it('Should call prisma client with correct values when role is customer', async () => {
    const sut = makeSut()
    const spyCreate = jest.spyOn(prismaMock.customer, 'create')
    const fakeAccountData = {
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      doc: 'any_doc',
      about: 'any_about',
      site: 'any_site',
      role: 'customer'
    }
    await sut.add(fakeAccountData)

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

  it('Should call prisma client with correct values when role is provider', async () => {
    const sut = makeSut()
    const spyCreate = jest.spyOn(prismaMock.provider, 'create')
    const fakeAccountData = {
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      doc: 'any_doc',
      about: 'any_about',
      site: 'any_site',
      role: 'provider'
    }
    await sut.add(fakeAccountData)

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
})
