import { FunctionComponentElement, Dispatch, SetStateAction } from 'react'

export interface Option<T = object | string> {
  value: T
  label: string
}

export type setSelectionsFunction = Dispatch<SetStateAction<OptionComponent[]>>

export interface ExtendedOption {
  isDisabled: boolean
  isSelected: boolean
  isFocused: boolean
  index: number
  onSelect: (option: Option) => void
  onMouseEnter: setSelectionsFunction
}

export type OptionProps = Option & ExtendedOption

export interface Selection<T = object | string> {
  value: T
  label: string
}

export type OptionComponent = FunctionComponentElement<OptionProps>
