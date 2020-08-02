import React, { useState } from 'react'

interface Props {
  isOpen: boolean
  closeSidebar: () => void
}
export const MobileSidebar = ({ isOpen, closeSidebar }: Props) => {
  const overlayClasses = isOpen ? 'opacity-100' : 'opacity-0'
  const sidebarClasses = isOpen ? 'translate-x-0' : '-translate-x-full'
  return (
    // <!-- Off-canvas menu for mobile -->
    <div className='md:hidden'>
      {isOpen && (
        <div className='fixed inset-0 flex z-40'>
          {/* Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0" */}
          <div
            className={`${overlayClasses} fixed inset-0 transition-opacity ease-linear duration-300`}>
            <div className={'absolute inset-0 bg-gray-600 opacity-75'}></div>
          </div>
          {/* Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full" */}
          <div
            className={`${sidebarClasses} transition ease-in-out duration-300 relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800`}>
            <div className='absolute top-0 right-0 -mr-14 p-1'>
              <button
                className='flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600'
                aria-label='Close sidebar'
                onClick={closeSidebar}>
                <svg
                  className='h-6 w-6 text-white'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='mt-5 flex-1 h-0 overflow-y-auto'>
              <nav className='px-2'></nav>
            </div>
          </div>
          {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          <div className='flex-shrink-0 w-14' />
        </div>
      )}
    </div>
  )
}
