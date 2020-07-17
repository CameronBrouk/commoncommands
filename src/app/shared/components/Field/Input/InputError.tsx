import * as R from 'ramda'
import React from 'react'
import { FieldError } from 'react-hook-form'
import * as T from './types'

type Props = {
  error: FieldError
  fieldValue: string | number
  validators: T.Validators
}

type Types = keyof T.Validators

export const InputError: FC<Props> = ({ error, fieldValue, validators }) => {
  const isString = (value: any): value is string => typeof value === 'string'
  const isNumber = (value: any): value is number => typeof value === 'number'
  const defaultMessages = {
    minLength:
      isString(fieldValue) &&
      isNumber(validators['minLength']) &&
      `please enter ${
        validators['minLength'] - fieldValue.length
      } more characters`,
    maxLength:
      typeof fieldValue === 'string' &&
      typeof validators['maxLength'] === 'number' &&
      `please enter ${
        fieldValue.length - validators['maxLength']
      } less characters`,
    max:
      typeof validators['max'] === 'number' &&
      `please enter a number less than ${validators['max'] + 1}`,
    min:
      typeof validators['min'] === 'number' &&
      `please enter a number more than ${validators['min'] + 1}`,
    required: 'please fill out this field',
    pattern: 'invalid input',
  }

  const hasError = (validatorType: Types) =>
    error.type && error.type === validatorType

  const message = (type: Types) => {
    // @ts-ignore
    if (Array.isArray(validators[type])) return validators[type][1]

    if (type === 'required') return defaultMessages.required
    if (type === 'pattern') return defaultMessages.pattern
    if (type === 'min') return defaultMessages.min
    if (type === 'max') return defaultMessages.max
    if (type === 'maxLength') return defaultMessages.maxLength
    if (type === 'minLength') return defaultMessages.maxLength
  }

  const E: FC = ({ children }) => <p className='text-red-400'>{children}</p>

  return (
    <>
      {hasError('required') && <E>{message('required')}</E>}
      {hasError('min') && <E>{message('min')}</E>}
      {hasError('max') && <E>{message('max')}</E>}
      {hasError('maxLength') && <E>{message('maxLength')}</E>}
      {hasError('minLength') && <E>{message('minLength')}</E>}
      {hasError('pattern') && <E>{message('pattern')}</E>}
    </>
  )
}
