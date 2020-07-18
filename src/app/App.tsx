import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar, Main, Header } from './layout'

import { useUI, CurrentUserProvider } from './shared/hooks/'

const App = () => {
  const { isMobile } = useUI()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value)

  return (
    <CurrentUserProvider>
      <div className='h-screen flex overflow-hidden bg-gray-100'>
        <MobileSidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        {!isMobile && <DesktopSidebar />}

        <div className='flex flex-col w-0 flex-1 overflow-hidden'>
          <Header
            openSidebar={() => setIsSidebarOpen(true)}
            onSearch={onSearch}
          />

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
