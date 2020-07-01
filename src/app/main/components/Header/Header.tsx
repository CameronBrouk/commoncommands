import React from 'react'
import { Search } from './Search'
import { ProfileDropdown } from './ProfileDropdown'
import { OpenSidebarButton } from './OpenSidebarButton'

type Props = { openSidebar: () => void }
export const Header = ({ openSidebar }: Props) => {
  return (
    <div className='relative z-10 flex-shrink-0 flex h-16 bg-white shadow'>
      <OpenSidebarButton openSidebar={openSidebar} />
      <div className='flex-1 px-4 flex justify-between'>
        <Search />
        <ProfileDropdown />
      </div>
    </div>
  )
}
