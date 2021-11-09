export interface AccountModel {
  id: number
  email: string
  password: string
  name: string
  doc: string
  about: string
  site: string
  active: boolean
}

export interface ResumedAccountModel {
  id: number
  name: string
  doc: string
}
