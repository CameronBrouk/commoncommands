import * as U from '../../../utils/common-functions'
import React from 'react'
import { FieldError, ValidationRules } from 'react-hook-form'
import * as T from './types'

type Props = {
  error: FieldError
  fieldValue: string | number
  validators: ValidationRules
}

export const InputError = ({ error, fieldValue, validators }: Props) => {
  const { minLength, maxLength, max, min, required, pattern } = validators

  const hasError = (validatorType: keyof ValidationRules) =>
    error && error.type && error.type === validatorType

  const message = (type: keyof ValidationRules) => {
    // @ts-ignore
    if (validators[type].message) return validators[type].message

    if (type === 'required') return 'please fill out this field'

    if (type === 'pattern') return 'invalid input'

    if (type === 'min' && min && U.isNum(min))
      return `please enter a number more than ${min + 1}`

    if (type === 'max' && max && U.isNum(max))
      return `please enter a number less than ${max + 1}`

    if (U.isNum(fieldValue)) return

    if (type === 'minLength' && minLength && U.isNum(minLength))
      return `please enter ${minLength - fieldValue.length} more characters`

    if (type === 'maxLength' && maxLength && U.isNum(maxLength))
      return `please enter ${fieldValue.length - maxLength} less characters`
  }

  const E: FC = ({ children }) => (
    <p className='pl-2 text-red-400'>{children}</p>
  )

  return (
    <>
      {hasError('required') && <E>{message('required')}</E>}
      {hasError('min') && <E>{message('min')}</E>}
      {hasError('max') && <E>{message('max')}</E>}
      {hasError('maxLength') && <E>{message('maxLength')}</E>}
      {hasError('minLength') && <E>{message('minLength')}</E>}
      {hasError('pattern') && <E>{message('pattern')}</E>}

      {Object.entries(validators['validate'] || []).map(
        ([message, validator]) =>
          fieldValue && validator(fieldValue) && <E>{message}</E>,
      )}
    </>
  )
}
