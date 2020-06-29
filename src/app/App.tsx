import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { useUI } from './shared/hooks/'
import AppRoutes from './App.routes'
import AppProvider from './App.context'

const App = () => {
  const { isMobile } = useUI()

  return (
    <>
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </>
  )
}

export default App
