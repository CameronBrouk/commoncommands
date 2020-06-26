import React, {useContext} from 'react'

import {useCheckPermission} from '../../../user/hooks/permissions.hooks'
import {useHistory} from 'react-router-dom'

import * as Constant from './nav.constants'
import * as Helper from './nav.helpers'

const DesktopNav = ({...props}) => {
  const history = useHistory()
  const {hasClearance} = useCheckPermission()

  const handleClick = (route: string) => history.push(route)

  const linkClass = (path: string) =>
    path === history.location.pathname ? 'current-link' : 'link'

  const routes = Constant.routes

  return (
    <header className={props.className}>
      <h3 style={{color: 'black'}}>Common Command</h3>
      {/* {routes.map((route, i) => (
        <button
          key={i}
          onClick={() => handleClick(route.path)}
          className={linkClass(route.path)}>
          {route.label}
        </button>
      ))} */}

      {hasClearance(1) && (
        <button onClick={() => Helper.logout()} className='link'>
          Logout
        </button>
      )}
    </header>
  )
}
