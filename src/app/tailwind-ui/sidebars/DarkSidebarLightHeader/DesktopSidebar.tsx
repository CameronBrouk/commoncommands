import React from 'react'
import { Link } from './Link'

export const DesktopSidebar = () => (
  <div className='hidden md:flex md:flex-shrink-0'>
    <div className='flex flex-col w-64 bg-gray-800'>
      <div className='h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
        <div className='flex-col items-center flex-shrink-0 px-4'>
          <h1 className='font-large text-white text-3xl'>Mouseless</h1>
          <p className='text-white font-small text-xs'>
            A cheatsheet for commands and keybinds
          </p>
        </div>
        <nav className='mt-5 flex-1 px-2 bg-gray-800'>
          <Link to='#' iconName='home' title='Dashboard' />
          <Link to='#' iconName='people' title='Vim' />
          <Link to='#' iconName='calendar' title='VsCode' />
          <Link to='#' iconName='folder' title='Windows' />
          <Link to='#' iconName='reports' title='Bash' />
        </nav>
      </div>
    </div>
  </div>
)
