import React, { useState, useContext, useRef, useEffect } from 'react'
import { usePermissions, CurrentUserContext } from 'app/firebase'
import { Button } from 'app/shared/components'
import { useKeybind } from '../../shared/hooks'
import { useClickOutside } from 'app/shared/components/Popup/useClickOutside'
import { SignInModal } from 'app/auth/SignInModal'

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [signInModalOpen, setSignInModalOpen] = useState(false)

  const { isLoggedIn } = usePermissions()
  const { user, logout } = useContext(CurrentUserContext)

  const ref = useClickOutside(isOpen, () => toggleOpen())
  useKeybind(['Escape'], () => setIsOpen(false))

  useEffect(() => {
    if (ref?.current?.firstChild) {
      const firstButtonRef = ref.current.firstChild as HTMLElement
      firstButtonRef.focus()
    }
  }, [isOpen])

  const toggleOpen = () => setIsOpen(v => !v)

  const openSignInModal = () => {
    setIsOpen(false)
    setSignInModalOpen(true)
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
              <Button role='menu-item' onClick={openSignInModal}>
                Sign In
              </Button>
            )}
          </dialog>
        )}

        <SignInModal
          isVisible={signInModalOpen}
          onClose={() => setSignInModalOpen(false)}
        />
      </div>
    </div>
  )
}
