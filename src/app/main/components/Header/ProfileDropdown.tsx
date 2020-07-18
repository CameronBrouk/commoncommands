import React, { useState } from 'react'
import { Link } from '../Link'

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const ref = useClickOutside(isOpen, () => toggleOpen())
  const toggleOpen = () => setIsOpen(v => !v)
  return (
    <div className='ml-4 flex items-center md:ml-6'>
      {/* <!-- Profile dropdown --> */}
      <div className='ml-3 relative'>
        <div>
          <button
            className='max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline'
            id='user-menu'
            aria-label='User menu'
            onClick={toggleOpen}
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
        {isOpen && (
          <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg'>
            <div
              className='py-1 rounded-md bg-white shadow-xs'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='user-menu'>
              <Link title='Your Profile' role='menuitem' />
              <Link title='Settings' role='menuitem' />
              <Link title='Sign Out' role='menuitem' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
