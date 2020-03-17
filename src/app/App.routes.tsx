import React from 'react'
import { Switch, Route } from 'react-router-dom'
import User from './user/User.routes'
import { Home } from './main/routes'

export default function AppRoutes() {
  return (
    <Switch>
      <Route path='/user'>
        <User />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}
