import React, { useState } from 'react'

interface Props {
  isOpen: boolean
  closeSidebar: () => void
}

export const MobileSidebar = ({ isOpen, closeSidebar }: Props) => {
  const overlayClasses = isOpen ? 'opacity-100' : 'opacity-0'
  const sidebarClasses = isOpen ? 'translate-x-0' : '-translate-x-full'
  return (
    <div className='md:hidden'>
      <div className='fixed inset-0 flex z-40'>
        {/* <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
        <div
          className={`${overlayClasses} fixed inset-0 transition-opacity ease-linear duration-300`}>
          <div className='absolute inset-0 bg-gray-600 opacity-75'></div>
        </div>
        {/* <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      --> */}
        {isOpen && (
          <div
            className={`${sidebarClasses} transition ease-in-out duration-300 transform relative flex-1 flex flex-col max-w-xs w-full bg-gray-`}>
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
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img
                  className='h-8 w-auto'
                  src='/img/logos/workflow-logo-on-dark.svg'
                  alt='Workflow'
                />
              </div>
              <nav className='mt-5 px-2'></nav>
            </div>
            <div className='flex-shrink-0 flex bg-gray-700 p-4'>
              <a href='#' className='flex-shrink-0 group block'>
                <div className='flex items-center'>
                  <div>
                    <img
                      className='inline-block h-10 w-10 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </div>
                  <div className='ml-3'>
                    <p className='text-base leading-6 font-medium text-white'>
                      Tom Cook
                    </p>
                    <p className='text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150'>
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        )}
        <div className='flex-shrink-0 w-14'>
          {/* <!-- Force sidebar to shrink to fit close icon --> */}
        </div>
      </div>
    </div>
  )
}
