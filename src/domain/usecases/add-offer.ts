export interface AddOfferModel {
  id_customer: number
  from: string
  to: string
  initial_value: number
  amount: number
  amount_type: string
}

export interface OfferId {
  id: number
}

export interface AddOffer {
  add: (data: AddOfferModel) => Promise<OfferId>
}
