import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Main, Header, DesktopSidebar } from './layout'

import { useUI } from './shared/hooks/'
import { CurrentUserProvider } from './firebase'

const App = () => {
  const { isMobile } = useUI()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <div className='flex h-screen overflow-hidden bg-gray-100'>
          <div className='flex flex-col flex-1 w-0 overflow-hidden'>
            <Header openSidebar={() => setIsSidebarOpen(true)} />

            {/* {isSidebarOpen && <DesktopSidebar />} */}

            <Main>{/* <AppRoutes /> */}</Main>
          </div>
        </div>
      </BrowserRouter>
    </CurrentUserProvider>
  )
}

export default App
