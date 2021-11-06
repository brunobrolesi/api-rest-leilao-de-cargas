import { BodyValidator } from '../../presentation/protocols/body-validator'
import { ValidatorResult } from '../../presentation/protocols/validator-result'
import Joi from 'joi'

export class SignUpValidator implements BodyValidator {
  isValid (body: object): ValidatorResult {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30).required(),
      name: Joi.string().min(5).max(80).required(),
      doc: Joi.string().regex(/([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})/).required(),
      about: Joi.string().min(5).max(255).required(),
      site: Joi.string().min(5).max(80).required(),
      role: Joi.string().regex(/(^customer$)|(^provider$)/).required()
    })

    const { error } = schema.validate(body)

    if (error) return { error: new Error(error.message) }

    return {}
  }
}
