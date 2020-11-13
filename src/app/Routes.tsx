import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { usePermissions } from './firebase'
import { AwaitingApproval } from './QRCodeGenerator/AwaitingApproval'
import { Dashboard } from './QRCodeGenerator/Dashboard'
import { Home } from './QRCodeGenerator/Home'
import { QRCodeForm } from './QRCodeGenerator/QRCodeForm'
import { Redirect } from './QRCodeGenerator/Redirect'
import { Users } from './users/Users'

export default function AppRoutes() {
  const { isLoggedIn, hasRole } = usePermissions()

  return (
    <Switch>
      <Route path='/create-qr'>
        {isLoggedIn() ? <QRCodeForm /> : <Home />}
      </Route>

      <Route path='/dashboard'>{isLoggedIn() ? <Dashboard /> : <Home />}</Route>

      <Route path='/users'>
        {hasRole('admin') ? <Users /> : <Dashboard />}
      </Route>

      <Route path='/redirect/:id'>
        <Redirect />
      </Route>

      <Route path='/awaiting-approval'>
        <AwaitingApproval />
      </Route>

      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}
