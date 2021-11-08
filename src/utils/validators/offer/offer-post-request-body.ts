import { BodyValidator } from '../../../presentation/protocols/body-validator'
import { ValidatorResult } from '../../../presentation/protocols/validator-result'
import Joi from 'joi'

export class OfferPostValidator implements BodyValidator {
  isValid (body: object): ValidatorResult {
    const schema = Joi.object({
      id_customer: Joi.number().required(),
      from: Joi.string().min(5).max(80).required(),
      to: Joi.string().min(5).max(80).required(),
      initial_value: Joi.number().positive().precision(2).required(),
      amount: Joi.number().positive().precision(2).required(),
      amount_type: Joi.string().regex(/(^KG$)|(^TON$)/).required()
    })

    const { error } = schema.validate(body)

    if (error) return { error: new Error(error.message) }

    return {}
  }
}
