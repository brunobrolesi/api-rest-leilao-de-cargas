import { ValidatorResult } from './validator-result'

export interface SignUpBodyValidator {
  isValid: (body: object) => ValidatorResult
}
