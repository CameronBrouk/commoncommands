import React, { useContext } from 'react'
import { ProfileDropdown } from './ProfileDropdown'
import { OpenSidebarButton } from './OpenSidebarButton'
import { Button } from 'app/shared/components'
import {
  CurrentUserContext,
  usePermissions,
  useRouter,
  useUI,
} from 'app/shared/hooks'

type Props = {
  openSidebar: () => void
}

export const Header = ({ openSidebar }: Props) => {
  const { logout } = useContext(CurrentUserContext)
  const { navigateTo } = useRouter()
  const { isLoggedIn, hasRole, hasClearance } = usePermissions()
  const { isMobile } = useUI()

  const onSignout = () => {
    logout()
    navigateTo('/')
  }

  if (!isLoggedIn()) return null

  return (
    <div className='relative z-10 flex flex-shrink-0 h-16 bg-white shadow'>
      {!isMobile && (
        <h1 className='flex items-center flex-1 p-5 text-xl font-bold'>
          QRCadia
        </h1>
      )}

      {hasClearance(1) && !hasRole('awaiting-approval') && (
        <div className='flex justify-center px-4'>
          <Button onClick={() => navigateTo('/create-qr')}>
            {!isMobile ? 'Create a QR Code' : 'Create Code'}
          </Button>
          <Button onClick={() => navigateTo('/dashboard')}>
            {!isMobile ? 'View Your Dashboard' : 'Dashboard'}
          </Button>
          {hasRole('admin') && (
            <Button onClick={() => navigateTo('/users')}>
              {!isMobile ? 'Edit Users From List' : 'Users'}
            </Button>
          )}
        </div>
      )}

      {isLoggedIn() && (
        <div className='flex justify-end flex-1 px-4'>
          <Button onClick={onSignout} variant='raised' className='m-3'>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
