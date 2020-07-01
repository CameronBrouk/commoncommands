import React from 'react'
import { Search } from './Search'
import { ProfileDropdown } from './ProfileDropdown'

export const Header = () => {
  return (
    <div className='flex-1 px-4 flex justify-between'>
      <Search />
      <ProfileDropdown />
    </div>
  )
}
