import React, { useRef, ChangeEvent } from 'react'
import { isNil } from '../../utils'
import { Icon } from '../../components/Icons/Icon'
import { useKeybind, useUI } from 'app/shared/hooks'

type Props = {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export const Search = ({ onSearch, ...props }: C<Props>) => {
  const ref = useRef<HTMLInputElement>(null)
  useKeybind(['/'], () => !isNil(ref?.current) && ref.current.focus())
  const { isMobile } = useUI()

  const placeholder = props.placeholder ? props.placeholder : 'Search'

  return (
    <div className='flex flex-1'>
      <div className='flex w-full md:ml-0'>
        <label htmlFor='search_field' className='sr-only'>
          Search
        </label>
        <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
          <div className='absolute inset-y-0 left-0 flex items-center ml-2 pointer-events-none'>
            <Icon iconName='search' />
          </div>
          <input
            ref={ref}
            id='search_field'
            onChange={onSearch}
            className='block w-full h-full py-4 pl-8 pr-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:placeholder-gray-400 sm:text-sm'
            placeholder={`${placeholder} ${
              !isMobile ? '(Press the "/" to focus)' : ''
            }`}
            type='search'
          />
        </div>
      </div>
    </div>
  )
}
