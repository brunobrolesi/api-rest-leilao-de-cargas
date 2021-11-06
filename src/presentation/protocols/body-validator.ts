import { ValidatorResult } from './validator-result'

export interface BodyValidator {
  isValid: (body: object) => ValidatorResult
}
