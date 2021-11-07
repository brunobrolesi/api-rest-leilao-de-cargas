import { prismaMock } from '../../../../../singleton'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { AccountCustomerPostgresRepository } from './account'

const makeSut = (): AccountCustomerPostgresRepository => {
  return new AccountCustomerPostgresRepository(prismaMock)
}

const makeCustomerFakeAccount = (): AddAccountModel => ({
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

describe('Account Customer PostgreSQL Repository', () => {
  it('Should call prisma client with correct values', async () => {
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

  it('Should return an account on add success', async () => {
    const sut = makeSut()
    prismaMock.customer.create.mockResolvedValueOnce(makeFakeAccountModel())

    const account = await sut.add(makeCustomerFakeAccount())

    expect(account).toEqual(makeFakeAccountModel())
  })

  it('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    prismaMock.customer.findUnique.mockResolvedValueOnce(makeFakeAccountModel())

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
    prismaMock.customer.findUnique.mockResolvedValueOnce(null)

    const account = await sut.loadByEmail('any_email')

    expect(account).toBeNull()
  })
})
