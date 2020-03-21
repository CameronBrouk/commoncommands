import React from 'react'
import styled from 'styled-components'
import { useObservable } from 'rxjs-hooks'
import { fromEvent } from 'rxjs'
import { map, filter, mapTo } from 'rxjs/operators'
import { useUI } from './shared/hooks/ui.hooks'
import { BrowserRouter as Router } from 'react-router-dom'
// import Navigation from './main/components/Navigation'
import { Navigation, MobileNav } from './main/components'
import AppRoutes from './App.routes'
import AppProvider from './App.context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'

const App = () => {
  const { isMobile } = useUI()
  console.log('app', isMobile)

  return (
    <>
      <CssBaseline />
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <main>
              {!isMobile && <Navigation />}
              <AppRoutes />
              {isMobile && <MobileNav />}
            </main>
          </Router>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

// export default App

export default styled(App)``
