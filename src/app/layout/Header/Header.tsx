import React, { useState } from 'react'
import { OpenSidebarButton } from './OpenSidebarButton'
import { Button, Search } from 'app/shared/components'
import { SignInModal } from 'app/auth'

type Props = {
  openSidebar: () => void
  onSearch: (input: React.ChangeEvent<HTMLInputElement>) => void
}

export const Header = ({ openSidebar, onSearch }: Props) => {
  const [loginVisible, setLoginVisible] = useState(false)
  return (
    <div className='relative z-10 flex flex-shrink-0 h-16 bg-white shadow'>
      <OpenSidebarButton openSidebar={openSidebar} />
      <div className='flex justify-between flex-1 px-4'>
        <Search onSearch={onSearch} />
        <Button
          variant='raised'
          className='m-3'
          onClick={() => setLoginVisible(v => !v)}>
          Login
        </Button>
      </div>
      <SignInModal
        isVisible={loginVisible}
        onClose={() => setLoginVisible(false)}
      />
    </div>
  )
}
