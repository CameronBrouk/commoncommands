import React from 'react'
import { Search } from '../../shared/components'
import { ProfileDropdown } from './ProfileDropdown'
import { OpenSidebarButton } from './OpenSidebarButton'

type Props = {
  openSidebar: () => void
  onSearch: (input: React.ChangeEvent<HTMLInputElement>) => void
}
export const Header = ({ openSidebar, onSearch }: Props) => {
  return (
    <div className='relative z-10 flex-shrink-0 flex h-16 bg-white shadow'>
      <OpenSidebarButton openSidebar={openSidebar} />
      <div className='flex-1 px-4 flex justify-between'>
        <Search onSearch={onSearch} />
        <ProfileDropdown />
      </div>
    </div>
  )
}
