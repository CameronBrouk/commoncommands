import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Login, Register } from './auth'

export default function AppRoutes() {
  return (
    <Switch>
      <Route path='/login'>{/* <Login /> */}</Route>
      <Route path='/register'>{/* <Register /> */}</Route>
      <Route path='/'>{/* <Home /> */}</Route>
    </Switch>
  )
}
