export const useFormValidators = () => {
  const min = (minLength: number) => (currentLength: any) =>
    currentLength >= minLength ? `min of ${minLength} characters` : ''

  const max = (maxLength: number) => (currentInput: string) =>
    currentInput.length <= maxLength ? `max of ${maxLength} characters` : false

  const email = (emailInput: string) =>
    emailInput &&
    !emailInput.match(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    )
      ? 'bad email'
      : false

  // const password = (password: any) => ''

  const required = (value: any) => (value ? undefined : 'Required')

  const mustBeNumber = (value: any) =>
    isNaN(value) ? 'Must be a number' : undefined

  const composeValidators = (...validators: any[]) => (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    )

  return {
    mustBeNumber,
    min,
    max,
    required,
    // password,
    email,
    composeValidators,
  }
}
