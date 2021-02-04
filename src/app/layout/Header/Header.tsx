import React, { useContext, useState } from 'react'
import { OpenSidebarButton } from './OpenSidebarButton'
import { Button, Search } from 'app/shared/components'
import { SignInModal } from 'app/auth'
import { CurrentUserContext, usePermissions } from 'app/firebase'

type Props = {
  openSidebar: () => void
  onSearch: (input: React.ChangeEvent<HTMLInputElement>) => void
}

export const Header = ({ openSidebar, onSearch }: Props) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [profileVisible, setProfileVisible] = useState(false)
  const { hasRole, isLoggedIn } = usePermissions()
  const { logout } = useContext(CurrentUserContext)

  return (
    <div className='relative z-10 flex flex-shrink-0 h-16 bg-white shadow'>
      <OpenSidebarButton openSidebar={openSidebar} />
      <div className='flex justify-between flex-1 px-4'>
        <Search onSearch={onSearch} />
        <Button
          variant='raised'
          className='m-3'
          onClick={() => (!isLoggedIn() ? setLoginVisible(v => !v) : logout())}>
          {!isLoggedIn() ? 'Login' : 'Logout'}
        </Button>
      </div>
      <SignInModal
        isVisible={loginVisible}
        onClose={() => setLoginVisible(false)}
      />
    </div>
  )
}
