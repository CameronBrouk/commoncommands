import React, { useContext } from 'react'
import styled from 'styled-components'

import { useCheckPermission } from '../../../user/hooks/permissions.hooks'
import { useHistory } from 'react-router-dom'

import * as Constant from './nav.constants'
import * as Helper from './nav.helpers'

const DesktopNav = ({ ...props }) => {
  const history = useHistory()
  const { hasClearance } = useCheckPermission()

  const handleClick = (route: string) => history.push(route)

  const linkClass = (path: string) =>
    path === history.location.pathname ? 'current-link' : 'link'

  const routes = Constant.routes

  return (
    <header className={props.className}>
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

export default styled(DesktopNav)`
  height: 1px;
  width: 100vw;
  max-width: 100%;
  background: #2e1534;
  color: white;
  justify-content: center;
  align-items: end;
  display: flex;

  .current-link,
  .link {
    background: transparent;
    position: absolute;
    right: 0;
    border: none;
    color: white;
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
