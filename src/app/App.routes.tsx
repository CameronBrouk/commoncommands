import React from 'react'
import { Switch, Route } from 'react-router-dom'
import User from './user/User.routes'
// import { Home, About, Team } from './main/routes'
import { Home, Services, Team, Resources } from './spinnaker/routes'
import { Login, Register } from './user/routes'

export default function AppRoutes() {
  return (
    <Switch>
      <Route path='/users'>
        <User />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}
