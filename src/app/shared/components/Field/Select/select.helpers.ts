import * as R from 'ramda'

export interface SelectedOption {
  value: string | object
  label: string
}

export const isDuplicateSelection = (
  selections: SelectedOption[],
  selection: SelectedOption,
) =>
  selections
    .map(selection => selection.label)
    .reduce((boolean, label) => selection.label === label || boolean, false)

export const setLabelForMultiple = (selections: SelectedOption[]) =>
  selections
    .map(selection => selection.label)
    .slice(0, 2)
    .join(', ')

export const getInitialLabel = (defaultValue: string, arrayOfOptions: any[]) =>
  R.filter(R.propEq('value', defaultValue))(
    arrayOfOptions.map((c: any) => c.props),
  ).pop()?.label || ''

export const getDefaultSelections = (
  defaultValue: SelectedOption | SelectedOption[] | string | any,
) => {
  switch (typeof defaultValue) {
    case 'string':
      return [{ value: defaultValue, label: defaultValue }]
    case 'object':
      return [defaultValue]
    default:
      return defaultValue
  }
}
