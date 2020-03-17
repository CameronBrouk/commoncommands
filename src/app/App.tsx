import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './main/components/Navigation'
import AppRoutes from './App.routes'

export default function App() {
  return (
    <Router>
      <Navigation />

      <AppRoutes />
    </Router>
  )
}
