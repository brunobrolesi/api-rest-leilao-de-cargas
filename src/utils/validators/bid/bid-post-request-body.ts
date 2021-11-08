import { BodyValidator } from '../../../presentation/protocols/body-validator'
import { ValidatorResult } from '../../../presentation/protocols/validator-result'
import Joi from 'joi'

export class BidPostValidator implements BodyValidator {
  isValid (body: object): ValidatorResult {
    const schema = Joi.object({
      id_provider: Joi.number().required(),
      email: Joi.string().email().required(),
      id_offer: Joi.number().required(),
      value: Joi.number().positive().precision(2).required(),
      amount: Joi.number().positive().precision(2).required()
    })

    const { error } = schema.validate(body)

    if (error) return { error: new Error(error.message) }

    return {}
  }
}
