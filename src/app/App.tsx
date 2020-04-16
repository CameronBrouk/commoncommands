import React from 'react'
import styled from 'styled-components'
import { useUI } from './shared/hooks/ui.hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import { DesktopNav, MobileNav } from './main/components'
import AppRoutes from './App.routes'
import AppProvider from './App.context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'
import { SnackbarProvider } from 'notistack'

const App = () => {
  const { isMobile } = useUI()

  return (
    <>
      <CssBaseline />
      <AppProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <Router>
              <nav>
                {!isMobile && <DesktopNav />}
                {isMobile && <MobileNav />}
              </nav>
              <AppRoutes />
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

export default styled(App)`
  nav {
    position: absolute;
    top: 0;
  }
`
