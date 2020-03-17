import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './main/components/Navigation'
import AppRoutes from './App.routes'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'

export default function App() {
  return (
    <>
      <Router>
        {/* Material UI Reset */}
        <CssBaseline />

        <ThemeProvider theme={theme}>
          {/* Material UI Theme */}
          <Navigation />

          <AppRoutes />
        </ThemeProvider>
      </Router>
    </>
  )
}
