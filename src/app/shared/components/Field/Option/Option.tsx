import React, {useRef} from 'react'

import useOption from './useOption'

export interface OptionProps extends ButtonElement {
  value: any
  label: string
  selected?: boolean
  checkbox?: boolean
  onSelect: (value: any) => void
}

const Option: FC<OptionProps> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {checkbox = false, onSelect = () => {}} = props

  useOption(buttonRef, () => handleSelect())

  const handleSelect = () => {
    onSelect(props.value)
  }

  return (
    <button
      ref={buttonRef}
      role={checkbox ? 'checkbox' : 'button'}
      aria-checked={props.selected}
      aria-label={props.label}
      disabled={props.disabled}
      className={props.className}
      onClick={handleSelect}
      // onMouseEnter={handleMouseEnter}
      {...props}>
      {props.children ? props.children : props.label}
    </button>
  )
}
