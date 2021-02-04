import React, { useEffect, useRef, useState } from 'react'
import { fromEvent } from 'rxjs'
import { tap, pluck, filter } from 'rxjs/operators'
import { fromRefEvent, onlyKeys } from '../../../utils/rxjs'

import useOption from './useOption'
import {
  focusNextElementInList,
  focusNextElement,
  focusPreviousElementInList,
} from '../../../utils/change-focus'
import { useKeybind } from 'app/shared/hooks'

export interface OptionProps extends ButtonElement {
  value: any
  label: string
  selected?: boolean
  checkbox?: boolean
  onSelect?: (value: any) => void
}

export const Option = ({ value, label, ...props }: C<OptionProps>) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { onSelect = () => {} } = props

  useOption(buttonRef, () => handleSelect())

  const handleSelect = () => {
    onSelect(value)
  }

  const selectedClasses = props.selected
    ? 'bg-blue-400 focus:text-black focus:bg-blue-300 text-gray-50'
    : ''

  const focusedClasses = 'focus:outline-none focus:bg-gray-100'
  const hoveredClasses = 'hover:bg-gray-100 cursor-pointer'

  return (
    <button
      ref={buttonRef}
      type='button'
      tabIndex={0}
      aria-label={label}
      disabled={props.disabled}
      className={`${props.className} ${focusedClasses} ${selectedClasses} ${hoveredClasses} w-full rounded-md py-1 text-left pl-2`}
      onClick={onSelect}
      {...props}>
      {props.children ? props.children : label}
    </button>
  )
}
