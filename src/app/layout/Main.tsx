import React, { useContext } from 'react'

export const Main: FC<{}> = ({ children }) => {
  return (
    <main
      className='relative z-0 flex-1 pt-2 pb-6 overflow-y-auto focus:outline-none md:py-6'
      tabIndex={0}>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900 sm:text-center md:text-left'>
          {/* Build and Customize a QR Code */}
        </h1>
      </div>
      <div className='mx-auto max-w-7xl md:px-2'>
        {/* <div className='py-2'>{children}</div> */}
        {children}
      </div>
    </main>
  )
}
