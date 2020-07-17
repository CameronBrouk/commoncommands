import { UseFormMethods, ValidationRules, FieldError } from 'react-hook-form'
import * as T from './types'

export const validatorObject = (validators: ValidationRules) => {
  // prettier-ignore
  const { min, max, minLength, maxLength, required, pattern, validate } = validators
  return {
    ...(min ? { min } : {}),
    ...(max ? { max } : {}),
    ...(maxLength ? { maxLength } : {}),
    ...(minLength ? { minLength } : {}),
    ...(required ? { required } : {}),
    ...(pattern ? { pattern } : {}),
    ...(validate ? { validate } : {}),
  }
}

export const minLengthMessage = (minLength: number, value: string) =>
  `please enter ${minLength - value.length} more characters`

export const maxLengthMessage = (maxLength: number, value: string) =>
  `please enter ${value.length - maxLength} less characters`

export const requiredMessage = () => 'please fill out this field'

export const min = (min?: Pick<ValidationRules, 'min'>) => {
  if (!min) return {}
  if (!Array.isArray(min)) return { min: `must be greater than ${min}` }
  return { min: min[1] }
}

export const max = (max?: Pick<ValidationRules, 'max'>) => {
  if (!max) return {}
  if (Array.isArray(max)) return { min: max[1] }
  return { max: `must be less than ${max}` }
}

export const maxLength = (maxLength?: Pick<ValidationRules, 'maxLength'>) => {
  if (!maxLength) return {}
  if (Array.isArray(maxLength)) return { maxLength: maxLength[1] }
  return { maxLength: `please enter no more than ${maxLength} characters` }
}

export const minLength = (minLength?: Pick<ValidationRules, 'minLength'>) => {
  if (!minLength) return {}
  if (Array.isArray(minLength)) return { minLength: minLength[1] }
  return { minLength: `please enter at least ${minLength} characters` }
}

export const required = (required?: Pick<ValidationRules, 'required'>) => {
  if (!required) return {}
  if (Array.isArray(required)) return { required: required[1] }
  return { required: `required` }
}

export const pattern = (pattern?: Pick<ValidationRules, 'pattern'>) => {
  if (!pattern) return {}
  if (Array.isArray(pattern)) return { pattern: pattern[1] }
  return { pattern: `invalid input` }
}
