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
  defaultValue?: string
}

type Props = C<InputProps & ValidationRules>

/**
 * Input Component That allows for easy, but complex validation
 *
 * @example
 * const exampleForm = () => {
 *  const form = useForm()
 *  const onSubmit = console.log
 *
 *  return (
 *    <form onSubmit={form.handleSubmit(onSubmit)}>
 *      // required field
 *      <Input form={form} name="Required Field" required />
 *      // number field with min/max validation
 *      <Input form={form} type="number" name="Number Field" min={3} max={5} />
 *      // text field with length validation
 *      <Input form={form} name="Text Field" minLength={3} maxLength={5} />
 *      // field with custom validation
 *      <Input form={form} name="Custom Validation"
 *        validate={{
 *           the key is the message shown if the current value of the field does not pass the predicate
 *          'Greater Than 3': currFieldValue => currFieldValue > 3,
 *          'Must Equal Test': currFieldValue => currFieldValue === 'test',
 *        }}
 *       />
 *      // You can input custom messages instead of the default for base validation
 *      <Input form={form} name="Custom Messages"
 *        pattern={{ value: /[hello|goodbye]/}, message: 'must be hello or goodbye' }}
 *        required={{ value: true, message: 'NEED VALUE PLZ' }}
 *       />
 *    </form>
 *  )
 * }
 */
export const Input = ({ form, label, name, ...props }: Props) => {
  const { register, watch, errors } = form
  const { type, autoFocus, autoComplete, ...validators } = props
  // prettier-ignore
  const { min, max, minLength, maxLength, required, pattern, validate } = validators

  return (
    <div className={props.className || 'mt-6'}>
      <label
        className='text-sm font-medium leading-5 text-gray-700 lock'
        htmlFor={label}>
        <span className='pl-2 m-0 text-gray-500 text-md'>
          <span className='pr-1 text-red-400'>
            {validators.required && '*'}
          </span>
          {label}
          {/* <span>{!validators.required && '(optional)'}</span> */}
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
            ...(validate ? { validate } : {}),
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
