import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../App.context'
import { useCheckPermission } from '../../user/hooks/permissions.hooks'
import { useHistory } from 'react-router-dom'
import { Button as MatButton } from '@material-ui/core'
import firebase from 'firebase'

const Button = styled(MatButton)``

const DesktopNav = ({ ...props }) => {
  const history = useHistory()
  const auth = firebase.auth()
  const { hasClearance } = useCheckPermission()

  const handleClick = (route: string) => history.push(route)
  const logout = () => {
    auth.signOut()
    window.location.reload()
  }

  const linkClass = (path: string) =>
    path === history.location.pathname ? 'current-link' : 'link'

  const routes = [
    { path: '/home', label: 'Home' },
    { path: '/resources', label: 'Use Our Resources' },
    { path: '/services', label: 'See Our Services' },
    { path: '/team', label: 'Meet The Team' },
  ]

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
        <button onClick={() => logout()} className='link'>
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
  background: transparent;
  justify-content: center;
  align-items: center;
  display: flex;

  .current-link,
  .link {
    background: transparent;
    border: none;
    color: white;
    margin: 10px;

    :hover {
      border-bottom: 1px solid white;
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
    border-bottom: 1px solid white;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${Button} {
    color: white;
  }

  /* .link {
    :hover {
      border-bottom: 2px white solid !important;
      color: red;
    }
  } */

  button {
    text-decoration: none;
    color: white;
    position: relative;
  }

  header > button:hover {
    color: white;
  }

  header > button:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  header > button:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`
