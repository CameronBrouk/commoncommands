import React, { useContext } from 'react'
import styled from 'styled-components'

import { useCheckPermission } from '../../../user/hooks/permissions.hooks'
import { useHistory } from 'react-router-dom'

import * as Constant from './constants'
import * as Helper from './nav.helper'

const DesktopNav = ({ ...props }) => {
  const history = useHistory()
  const { hasClearance } = useCheckPermission()

  const handleClick = (route: string) => history.push(route)

  const linkClass = (path: string) =>
    path === history.location.pathname ? 'current-link' : 'link'

  const routes = Constant.routes

  return (
    <header className={props.className}>
      {routes.map((route, i) => (
        <button
          key={i}
          onClick={() => handleClick(route.path)}
          className={linkClass(route.path)}>
          {route.label}
        </button>
      ))}

      {hasClearance(1) && (
        <button onClick={() => Helper.logout()} className='link'>
          Logout
        </button>
      )}
    </header>
  )
}

export default styled(DesktopNav)`
  height: 10vh;
  width: 100vw;
  max-width: 100%;
  background: #eee;
  justify-content: center;
  align-items: center;
  display: flex;

  .current-link,
  .link {
    background: transparent;
    border: none;
    margin: 10px;

    :hover {
      border-bottom: 1px solid black;
      cursor: pointer;
    }

    :focus {
      outline: none;
    }

    :active {
      border: none;
    }
  }

  .current-link {
    border-bottom: 1px solid black;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
