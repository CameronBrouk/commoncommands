import React from 'react'
import { Link } from '../sidebars/DarkSidebarLightHeader/Link'

export const Search = () => (
  <div className='flex-1 px-4 flex justify-between'>
    <div className='flex-1 flex'>
      <div className='w-full flex md:ml-0'>
        <label htmlFor='search_field' className='sr-only'>
          Search
        </label>
        <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
          <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
            <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              />
            </svg>
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
    <div className='ml-4 flex items-center md:ml-6'>
      {/* <!-- Profile dropdown --> */}
      <div className='ml-3 relative'>
        <div>
          <button
            className='max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline'
            id='user-menu'
            aria-label='User menu'
            aria-haspopup='true'>
            <img
              className='h-8 w-8 rounded-full'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt=''
            />
          </button>
        </div>
        {/* <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
        <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg'>
          <div
            className='py-1 rounded-md bg-white shadow-xs'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='user-menu'>
            <Link to='#' title='Your Profile' role='menuitem' />
            <Link to='#' title='Settings' role='menuitem' />
            <Link to='#' title='Sign Out' role='menuitem' />
          </div>
        </div>
      </div>
    </div>
  </div>
)
