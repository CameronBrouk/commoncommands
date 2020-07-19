import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar, Main, Header } from './layout'

import { useUI, CurrentUserProvider } from './shared/hooks/'

const App = () => {
  const { isMobile } = useUI()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <CurrentUserProvider>
      <div className='h-screen flex overflow-hidden bg-gray-100'>
        <MobileSidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        {!isMobile && <DesktopSidebar />}

        <div className='flex flex-col w-0 flex-1 overflow-hidden'>
          <Header openSidebar={() => setIsSidebarOpen(true)} />

          <Main>
            <div></div>
            <div></div>
            <div></div>
          </Main>
        </div>
      </div>
    </CurrentUserProvider>
  )
}

export default App
