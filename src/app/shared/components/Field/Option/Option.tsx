import React, { useRef } from 'react'
import styled from 'styled-components'

import useOption from './useOption'

export interface OptionProps extends ButtonElement {
  value: any
  label: string
  selected?: boolean
  checkbox?: boolean
  onSelect: (value: any) => void
}

const Option: FC<OptionProps> = props => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { checkbox = false, onSelect = () => {} } = props

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

export default styled(Option)`
  align-items: center;
  background: white;
  border-radius: 5px;
  border: none;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  padding: 0.5em;
  text-align: left;
  width: 100%;

  color: darkblue;
  background: lightblue;

  :focus,
  :hover {
    background: ${({ selected }) => (selected ? 'green' : ' blue')};
  }
  :disabled {
    background: #eee;
    color: darkgrey;
  }
`
