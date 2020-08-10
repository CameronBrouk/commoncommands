import React, { useState, useContext } from 'react'
import firebase from 'firebase'
import { Link } from '../Link'
import { usePermissions, CurrentUserContext } from 'app/firebase'
import { Button } from 'app/shared/components'

export const ProfileDropdown = () => {
  const { isLoggedIn } = usePermissions()
  const { user } = useContext(CurrentUserContext)
  const [isOpen, setIsOpen] = useState(false)
  // const ref = useClickOutside(isOpen, () => toggleOpen())
  const toggleOpen = () => setIsOpen(v => !v)

  const logout = () => {
    firebase.auth().signOut()
  }

  return (
    <div className='flex items-center ml-4 md:ml-6'>
      <div className='relative ml-3'>
        <div>
          <button
            className='flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:shadow-outline'
            id='user-menu'
            aria-label='User menu'
            onClick={toggleOpen}
            aria-haspopup='true'>
            <img
              className='w-8 h-8 border border-gray-500 rounded-full'
              src={
                user.photoURL ??
                'https://urbaned.tcnj.edu/wp-content/uploads/sites/85/2019/10/placeholder-profile-1.png'
              }
              alt=''
            />
          </button>
        </div>

        {isOpen && (
          <div className='absolute right-0 mt-2 origin-top-right rounded-md shadow-lg w-36'>
            <div
              className='flex flex-col items-start justify-start px-3 py-2 bg-white rounded-md shadow-xs'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='user-menu'>
              {isLoggedIn() && (
                <>
                  <Button role='menu-item'>Your Profile</Button>
                  <Button role='menu-item' onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
              {!isLoggedIn() && (
                <>
                  <Button role='menu-item'>Login</Button>
                  <Button role='menu-item'>Register</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
