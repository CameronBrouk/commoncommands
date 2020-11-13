import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Main, Header } from './layout'

import { useUI } from './shared/hooks/'
import { CurrentUserProvider } from './firebase'
import AppRoutes from './Routes'

const App = () => {
  const { isMobile } = useUI()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <div className='flex h-screen overflow-hidden bg-gray-100'>
          <div className='flex flex-col flex-1 w-0 overflow-hidden'>
            <Header openSidebar={() => setIsSidebarOpen(true)} />

            <Main>
              <AppRoutes />
            </Main>
          </div>
        </div>
      </BrowserRouter>
    </CurrentUserProvider>
  )
}

export default App
