import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import { usePermissions } from './firebase'
import { Users } from './users/Users'

export default function AppRoutes() {
  const { isLoggedIn, hasRole } = usePermissions()

  return (
    <Switch>
      <Route path='/dashboard'>{isLoggedIn() ? <App /> : <App />}</Route>

      <Route path='/users'>{hasRole('admin') ? <Users /> : <App />}</Route>

      <Route path='/'>
        <App />
      </Route>

      <Route path='/home'>
        <App />
      </Route>
    </Switch>
  )
}
