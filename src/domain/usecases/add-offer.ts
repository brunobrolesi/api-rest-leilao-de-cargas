export interface AddOfferModel {
  id_customer: number
  from: string
  to: string
  initial_value: string
  amount: string
  amount_type: string
}

export interface AddOffer {
  add: (data: AddOfferModel) => Promise<void>
}
