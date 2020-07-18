import React from 'react'
import { Link } from '../Link'

export const Nav = () => {
  return (
    <nav className='mt-5 flex-1 px-2 bg-gray-800'>
      <Link iconName='home' title='Home' />
      <Link iconName='home' title='Page 1' />
      <Link iconName='home' title='Page 2' />
    </nav>
  )
}
