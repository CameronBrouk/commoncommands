import React from 'react'
import styled from 'styled-components'

type InputProps = {
  label: string
  type: InputTypes
  required: boolean
  error?: string
  hint?: string
}

type Props = InputProps & InputElement

export const Input = ({ label, hint, error, type, ...rest }: Props) => {
  return (
    <>
      <label htmlFor={label}>
        <span className='label-text'>
          <span className='is-required'>{rest.required && '*'}</span>
          {label}
          <span className='is-optional'>{!rest.required && '(optional)'}</span>
        </span>

        {/* a33y - error is nested in label tag */}
        {error && <p>{error}</p>}

        {/* a33y - hint is nested in label tag */}
        {hint && <p>{hint}</p>}
      </label>

      <input name={label} id={label} type={type} {...rest} />
    </>
  )
}

export default styled(Input)``

type InputTypes =
  | 'text'
  | 'search'
  | 'email'
  | 'password'
  | 'reset'
  | 'time'
  | 'url'
  | 'date'
  | 'week'
  | 'tel'
