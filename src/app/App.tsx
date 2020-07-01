import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar } from './main/components/Sidebar'
import { Main, Header } from './main/components'
import { Commands } from './commands/Commands'

import { useUI } from './shared/hooks/'
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
            <MobileSidebar
              isOpen={isSidebarOpen}
              closeSidebar={() => setIsSidebarOpen(false)}
            />

            {!isMobile && <DesktopSidebar />}

            <div className='flex flex-col w-0 flex-1 overflow-hidden'>
              <Header openSidebar={() => setIsSidebarOpen(true)} />

              <Main>
                <Commands />
              </Main>
            </div>
          </div>
        </Router>
      </AppProvider>
    </>
  )
}

export default App
