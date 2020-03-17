import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './main/components/Navigation'
import AppRoutes from './App.routes'
import AppProvider from './App.context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'

const App = () => {
  return (
    <AppProvider>
      <Router>
        {/* Material UI Reset */}
        <CssBaseline />

        <ThemeProvider theme={theme}>
          {/* Material UI Theme */}
          <Navigation />

          <AppRoutes />
        </ThemeProvider>
      </Router>
    </AppProvider>
  )
}

export default App
