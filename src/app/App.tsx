import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar } from './main/components/Sidebar'
import { Main, Header } from './main/components'

import { useUI } from './shared/hooks/'
import AppRoutes from './App.routes'
import AppProvider from './App.context'

const App = () => {
  const { isMobile } = useUI()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <AppProvider>
        <Router>
          {/* <AppRoutes /> */}
          <div className='h-screen flex overflow-hidden bg-gray-100'>
            {/* <!-- Off-canvas menu for mobile --> */}

            <MobileSidebar
              isOpen={isSidebarOpen}
              closeSidebar={() => setIsSidebarOpen(false)}
            />

            {!isMobile && <DesktopSidebar />}

            <div className='flex flex-col w-0 flex-1 overflow-hidden'>
              <div className='relative z-10 flex-shrink-0 flex h-16 bg-white shadow'>
                <button
                  className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden'
                  aria-label='Open sidebar'
                  onClick={() => setIsSidebarOpen(true)}>
                  <svg
                    className='h-6 w-6'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h7'
                    />
                  </svg>
                </button>

                <Header />
              </div>

              <Main />
            </div>
          </div>
        </Router>
      </AppProvider>
    </>
  )
}

export default App
