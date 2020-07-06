import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Login, Register } from './user/routes'
// import { Home } from './main/routes'

export default function AppRoutes() {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/'>{/* <Home /> */}</Route>
    </Switch>
  )
}
