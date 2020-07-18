import React from 'react'
import { Nav } from './Nav'

export const DesktopSidebar = () => (
  <div className='hidden md:flex md:flex-shrink-0'>
    <div className='flex flex-col w-64 bg-gray-800'>
      <div className='h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
        <div className='flex-col items-center flex-shrink-0 px-4'>
          <h1 className='font-large text-white text-3xl'>Website Title</h1>
          <p className='text-white font-small text-xs'>
            This is a general description of the website
          </p>
        </div>
        <Nav />
      </div>
    </div>
  </div>
)
