import React from 'react'
import { ProfileDropdown } from './ProfileDropdown'
import { OpenSidebarButton } from './OpenSidebarButton'
import { Search } from 'app/shared/components'

type Props = {
  openSidebar: () => void
  onSearch: (input: React.ChangeEvent<HTMLInputElement>) => void
}
export const Header = ({ openSidebar, onSearch }: Props) => {
  return (
    <div className='relative z-10 flex flex-shrink-0 h-16 bg-white shadow'>
      <OpenSidebarButton openSidebar={openSidebar} />
      <div className='flex justify-between flex-1 px-4'>
        <Search onSearch={onSearch} />
        <ProfileDropdown />
      </div>
    </div>
  )
}
