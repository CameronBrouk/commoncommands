import React from 'react'
import { Icon } from '../Icons/Icon'

export const Search = () => {
  return (
    <div className='flex-1 flex'>
      <div className='w-full flex md:ml-0'>
        <label htmlFor='search_field' className='sr-only'>
          Search
        </label>
        <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
          <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
            <Icon iconName='search' />
          </div>
          <input
            id='search_field'
            className='block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm'
            placeholder='Search Keybinds (Press the "/" to focus)'
            type='search'
          />
        </div>
      </div>
    </div>
  )
}
