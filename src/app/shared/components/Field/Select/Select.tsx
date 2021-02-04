import { searchObject } from 'app/shared/utils'
import React, { useState, Children, useRef } from 'react'
import { UseFormMethods } from 'react-hook-form'
import { Menu } from '../../Popup'
import { Option } from '../Option/Option'
import { Search } from '../Search'
import * as R from 'ramda'
import {
  getDefaultSelections,
  getInitialLabel,
  isDuplicateSelection,
  setLabelForMultiple,
} from './select.helpers'

type Props = {
  name: string
  label: string
  form?: UseFormMethods<Record<string, any>>
  onSelect?: (selections: SelectedOption[]) => void
  children: React.FunctionComponentElement<SelectedOption>[]
  search?: boolean
  multiple?: boolean
  defaultValue?: string
  required?: boolean
}

export type SelectedOption = {
  label: string
  value: any
}

export const Select = ({ form, label, name, ...props }: C<Props>) => {
  const [selectOpen, setSelectOpen] = useState(false)
  const [selections, setSelections] = useState<SelectedOption[]>(
    getDefaultSelections(props.defaultValue) || [],
  )
  const [optionLabel, setOptionLabel] = useState(
    getInitialLabel(props.defaultValue || '', Children.toArray(props.children)),
  )
  const [searchTerm, setSearchTerm] = useState('')

  const handleSelect = (selectedOption: SelectedOption) => {
    props.multiple
      ? handleMultipleSelect(selectedOption)
      : handleSingleSelect(selectedOption)
  }

  const handleSingleSelect = (selection: SelectedOption) => {
    setSelectOpen(false)
    setSelections((selections: SelectedOption[]) => {
      const isDuplicate = isDuplicateSelection(selections, selection)
      setOptionLabel(isDuplicate ? label : selection.label)
      const updatedSelection = isDuplicate ? [] : [selection]
      props.onSelect && props.onSelect(updatedSelection)
      return updatedSelection
    })
  }

  const handleMultipleSelect = (selectedOption: SelectedOption) => {
    setSelections((selections: SelectedOption[]) => {
      const updatedSelections = isDuplicateSelection(selections, selectedOption)
        ? R.reject(R.propEq('label', selectedOption.label), selections)
        : [selectedOption, ...selections]

      updatedSelections.length > 0
        ? setOptionLabel(setLabelForMultiple(updatedSelections))
        : setOptionLabel(label)

      props.onSelect && props.onSelect(updatedSelections)
      return updatedSelections
    })
  }

  return (
    <div className={props.className || 'mt-6 flex-col w-full'}>
      <label
        className='text-sm font-medium leading-5 text-gray-700 lock'
        htmlFor={label}>
        <span className='pl-2 m-0 text-gray-500 text-md'>
          <span className='pr-1 text-red-400'>{props.required && '*'}</span>
          {label}
        </span>
      </label>

      <input
        className='hidden sr-only'
        id={label}
        placeholder={label}
        value={selections.map(s => s.value) || props.defaultValue}
        ref={form && form.register({ required: props.required })}
        name={name}
        readOnly
      />

      <div className='relative w-full'>
        <button
          className='block w-full px-3 py-2 text-left placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none cursor-pointer focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
          type='button'
          onClick={() => setSelectOpen(o => !o)}>
          <div className='flex'>
            {/* Placeholder */}
            <span className='flex-1'>{optionLabel}</span>

            {/* Icon */}
            <svg
              className='w-5 h-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'>
              <path
                fillRule='evenodd'
                d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </button>

        {/* Show Error if Required */}
        {form && form.errors[name] && form.errors[name].type === 'required' && (
          <p className='pl-2 text-red-400'>please select an option</p>
        )}

        <Menu
          isVisible={selectOpen}
          onClose={() => setSelectOpen(false)}
          className='w-full focus-within:border-blue-300'>
          {props.search && (
            <div className='mb-3 border-b border-gray-500'>
              <Search onSearch={({ target }) => setSearchTerm(target.value)} />
            </div>
          )}

          {Children.map(props.children, ({ props }, i) =>
            searchObject(props, searchTerm) ? (
              <Option
                key={i}
                selected={R.find(R.propEq('value', props.value), selections)}
                onClick={() =>
                  handleSelect({ value: props.value, label: props.label })
                }
                {...props}
              />
            ) : null,
          )}
        </Menu>
      </div>
    </div>
  )
}
