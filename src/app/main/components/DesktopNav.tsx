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
  const { permissions } = useContext(AppContext)
  const { hasRole, hasClearance, hasKey, isLoggedIn } = useCheckPermission()

  const handleClick = (route: string) => history.push(route)
  const logout = () => {
    auth.signOut()
    window.location.reload()
  }

  return (
    <div className={props.className}>
      <Button onClick={() => handleClick('/home')}>Home</Button>
      <Button onClick={() => handleClick('/users')}>User</Button>
      {hasClearance(1) ? (
        <Button onClick={() => logout()}>Logout</Button>
      ) : (
        <Button onClick={() => handleClick('/login')}>Login</Button>
      )}
    </div>
  )
}

export default styled(DesktopNav)`
  height: 10vh;
  width: 100vw;
  max-width: 100%;
  background: darkblue;
  justify-content: center;
  align-items: center;
  display: flex;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${Button} {
    color: white;
  }
`
