import React from 'react'

export const Main = () => {
  return (
    <main
      className='flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6'
      tabIndex={0}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='py-4'>
          <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'>
            {/* <Content /> */}
          </div>
        </div>
      </div>
    </main>
  )
}
