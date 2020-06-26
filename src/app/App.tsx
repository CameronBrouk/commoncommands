import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {CssBaseline, ThemeProvider} from '@material-ui/core'
import {SnackbarProvider} from 'notistack'
import {DesktopNav, MobileNav} from './main/components'

import {useUI} from './shared/hooks/ui.hooks'
import AppRoutes from './App.routes'
import AppProvider from './App.context'
import theme from '../styles/theme'

const App = () => {
  const {isMobile} = useUI()

  return (
    <>
      <CssBaseline />
      <AppProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <Router>
              <nav>
                {<DesktopNav />}
                {/* {isMobile && <MobileNav />} */}
              </nav>
              <AppRoutes />
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}
