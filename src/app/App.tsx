import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar, Main, Header } from './layout'
import { Commands } from './commands/Commands'
import { CommandsProvider } from './commands/Commands.context'

import { useUI, CurrentUserProvider } from './shared/hooks/'

const App = () => {
  const { isMobile } = useUI()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value)

  return (
    <CurrentUserProvider>
      <CommandsProvider>
        <div className='flex h-screen overflow-hidden'>
          <MobileSidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          />

          {!isMobile && <DesktopSidebar />}

          <div className='flex flex-col flex-1 w-0 overflow-hidden'>
            <Header
              openSidebar={() => setIsSidebarOpen(true)}
              onSearch={onSearch}
            />

            <Main>
              <Commands searchTerm={searchTerm} />
            </Main>
          </div>
        </div>
      </CommandsProvider>
    </CurrentUserProvider>
  )
}

export default App
