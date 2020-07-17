export type InputTypes =
  | ' button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime - local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

/**
 * Extension of a native HTML Inputs validator props.  you can enter the default value, or a tuple with the value followed by a custom message
 */
export type Validators = {
  min?: number | [number, string]
  minLength?: number | [number, string]
  max?: number | [number, string]
  maxLength?: number | [number, string]
  required?: boolean | [boolean, string]
  pattern?: RegExp | [string, string]
  validate?: CustomValidator | [CustomValidator, string]
}

type CustomValidator = Record<
  string,
  (fieldValue: any) => boolean | Promise<boolean>
>
