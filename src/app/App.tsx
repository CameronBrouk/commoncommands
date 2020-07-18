import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { DesktopSidebar, MobileSidebar } from './main/components/Sidebar'
import { Main, Header } from './main/components'
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
              <Commands searchTerm={searchTerm} />
            </Main>
          </div>
        </div>
      </CommandsProvider>
    </CurrentUserProvider>
  )
}

export default App
