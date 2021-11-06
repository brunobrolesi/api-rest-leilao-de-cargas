import { AccountPostgresRepository } from './account'
import { prismaMock } from '../../../../../singleton'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

const makeSut = (): AddAccountRepository => {
  return new AccountPostgresRepository(prismaMock)
}

const makeCustomerFakeAccount = (): AddAccountModel => ({
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  doc: 'any_doc',
  about: 'any_about',
  site: 'any_site',
  role: 'customer'
})

const makeProviderFakeAccount = (): AddAccountModel => ({
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  doc: 'any_doc',
  about: 'any_about',
  site: 'any_site',
  role: 'provider'
})

describe('Account PostgreSQL Repository', () => {
  it('Should call prisma client with correct values when role is customer', async () => {
    const sut = makeSut()
    const spyCreate = jest.spyOn(prismaMock.customer, 'create')
    await sut.add(makeCustomerFakeAccount())

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
    prismaMock.customer.create.mockResolvedValueOnce({
      id: 1,
      email: 'any_email',
      password: 'any_password',
      name: 'any_name',
      doc: 'any_doc',
      about: 'any_about',
      site: 'any_site',
      active: true
    })

    const account = await sut.add(makeCustomerFakeAccount())

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
})
