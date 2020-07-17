import React from 'react'
import { UseFormMethods, ValidationRules } from 'react-hook-form'
import { InputTypes, Validators } from './types'
import * as H from './helpers'
import { InputError } from './InputError'

type InputProps = {
  type?: InputTypes
  form: UseFormMethods<Record<string, any>>
  label: string
  name: string
}

export const Input: FC<InputProps & Validators> = props => {
  const { form, label, type, name, ...validators } = props
  const { register, errors, watch } = form

  return (
    <label>
      <span>
        <span>{validators.required && '*'}</span>
        {label}
        <span>{!validators.required && '(optional)'}</span>
      </span>

      <input
        id={label}
        ref={register(H.validatorObject(validators as ValidationRules))}
        type={type ? type : 'text'}
      />

      <InputError
        fieldValue={watch(name)}
        error={errors[name]}
        validators={validators}
      />
    </label>
  )
}

const min = (min?: Pick<Validators, 'min'>) => {
  if (!min) return {}
  if (!Array.isArray(min)) return { min: `must be greater than ${min}` }
  return { min: min[1] }
}

const max = (max?: Pick<Validators, 'max'>) => {
  if (!max) return {}
  if (Array.isArray(max)) return { min: max[1] }
  return { max: `must be less than ${max}` }
}

const maxLength = (maxLength?: Pick<Validators, 'maxLength'>) => {
  if (!maxLength) return {}
  if (Array.isArray(maxLength)) return { maxLength: maxLength[1] }
  return { maxLength: `please enter no more than ${maxLength} characters` }
}

const minLength = (minLength?: Pick<Validators, 'minLength'>) => {
  if (!minLength) return {}
  if (Array.isArray(minLength)) return { minLength: minLength[1] }
  return { minLength: `please enter at least ${minLength} characters` }
}

const required = (required?: Pick<Validators, 'required'>) => {
  if (!required) return {}
  if (Array.isArray(required)) return { required: required[1] }
  return { required: `required` }
}

const pattern = (pattern?: Pick<Validators, 'pattern'>) => {
  if (!pattern) return {}
  if (Array.isArray(pattern)) return { pattern: pattern[1] }
  return { pattern: `invalid input` }
}
