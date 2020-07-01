import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar, Search } from './tailwind-ui'
import { Main } from './components'

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

            {isMobile && (
              <MobileSidebar
                isOpen={isSidebarOpen}
                closeSidebar={() => setIsSidebarOpen(false)}
              />
            )}

            {!isMobile && <DesktopSidebar />}

            <div className='flex flex-col w-0 flex-1 overflow-hidden'>
              {/* <div className='md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3'>
                <button
                  className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150'
                  aria-label='Open sidebar'
                  onClick={() => setIsSidebarOpen(true)}>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
 */}
              <Search />

              <Main />
            </div>
          </div>
        </Router>
      </AppProvider>
    </>
  )
}

export default App
