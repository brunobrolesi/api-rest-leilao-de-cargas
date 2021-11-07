import { BodyValidator } from '../../../presentation/protocols/body-validator'
import { ValidatorResult } from '../../../presentation/protocols/validator-result'
import Joi from 'joi'

export class LoginValidator implements BodyValidator {
  isValid (body: object): ValidatorResult {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).required()
    })

    const { error } = schema.validate(body)

    if (error) return { error: new Error(error.message) }

    return {}
  }
}
