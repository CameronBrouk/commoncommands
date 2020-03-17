import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './main/components/Navigation'
import AppRoutes from './App.routes'
import AppProvider from './App.context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Navigation />

            <AppRoutes />
          </Router>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

export default App
