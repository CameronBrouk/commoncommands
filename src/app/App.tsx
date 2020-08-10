import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar, Main, Header } from './layout'

import { useUI, CurrentUserProvider } from './shared/hooks/'

const App = () => {
  const { isMobile } = useUI()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <div className='flex h-screen overflow-hidden bg-gray-100'>
          <MobileSidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          />

          {!isMobile && <DesktopSidebar />}

          <div className='flex flex-col flex-1 w-0 overflow-hidden'>
            <Header openSidebar={() => setIsSidebarOpen(true)} />

            <Main>
              <div></div>
              <div></div>
              <div></div>
            </Main>
          </div>
        </div>
      </BrowserRouter>
    </CurrentUserProvider>
  )
}

export default App
