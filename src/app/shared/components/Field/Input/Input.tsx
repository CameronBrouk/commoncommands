import React from 'react'
import { UseFormMethods, ValidationRules } from 'react-hook-form'
import { InputTypes } from './types'
import { InputError } from './InputError'

type InputProps = {
  form: UseFormMethods<Record<string, any>>
  label: string
  name: string
  type?: InputTypes
  autoFocus?: boolean
  autoComplete?: boolean
}

type Props = C<InputProps & ValidationRules>

export const Input = ({ form, label, name, ...props }: Props) => {
  const { register, watch, errors } = form
  const { type, autoFocus, autoComplete, ...validators } = props
  const { min, max, minLength, maxLength, required, pattern } = validators

  return (
    <label>
      <span>
        <span>{validators.required && '*'}</span>
        {label}
        <span>{!validators.required && '(optional)'}</span>
      </span>

      <input
        id={label}
        ref={register({
          ...(min ? { min } : {}),
          ...(max ? { max } : {}),
          ...(maxLength ? { maxLength } : {}),
          ...(minLength ? { minLength } : {}),
          ...(required ? { required } : {}),
          ...(pattern ? { pattern } : {}),
        })}
        type={type ? type : 'text'}
        name={name}
        autoFocus={autoFocus}
        autoComplete={autoComplete ? 'on' : 'off'}
      />

      <InputError
        fieldValue={watch(name)}
        error={errors[name]}
        validators={validators}
      />
    </label>
  )
}
