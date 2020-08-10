import React, { useState, useContext, useRef, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from '../Link'
import { usePermissions, CurrentUserContext } from 'app/firebase'
import { Button } from 'app/shared/components'
import { useKeybind } from '../../shared/hooks'
import { useClickOutside } from 'app/shared/components/Popup/useClickOutside'

export const ProfileDropdown = () => {
  const { user } = useContext(CurrentUserContext)
  const [isOpen, setIsOpen] = useState(false)
  const firstButtonRef = useRef<HTMLButtonElement>(null)
  useKeybind(['Escape'], () => setIsOpen(false))
  const ref = useClickOutside(isOpen, () => toggleOpen())
  const { isLoggedIn } = usePermissions()

  useEffect(() => {
    if (ref?.current?.firstChild) {
      const firstButtonRef = ref.current.firstChild as HTMLElement
      firstButtonRef.focus()
    }
  }, [isOpen])

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
          <dialog
            ref={ref}
            open={isOpen}
            className='absolute left-auto mt-2 origin-top-left rounded-md shadow-lg w-36'
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
          </dialog>
        )}
      </div>
    </div>
  )
}
