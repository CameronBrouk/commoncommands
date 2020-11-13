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
  className?: string
  defaultValue?: string
}

type Props = C<InputProps & ValidationRules>

export const Input = ({ form, label, name, ...props }: Props) => {
  const { register, watch, errors } = form
  const { type, autoFocus, autoComplete, ...validators } = props
  const { min, max, minLength, maxLength, required, pattern } = validators

  return (
    <div className={props.className || 'mt-6'}>
      <label
        className='text-sm font-medium leading-5 text-gray-700 lock'
        htmlFor={label}>
        <span className='pl-2 m-0 text-gray-500 text-md'>
          {/* <span>{validators.required && '*'}</span> */}
          {label}
          <span>{!validators.required && '(optional)'}</span>
        </span>
      </label>

      <div className='rounded-md shadow-sm'>
        <input
          className='block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
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
          placeholder={label}
          autoFocus={autoFocus}
          autoComplete={autoComplete ? 'on' : 'off'}
          defaultValue={props.defaultValue}
        />
      </div>

      <InputError
        fieldValue={watch(name)}
        error={errors[name]}
        validators={validators}
      />
    </div>
  )
}
