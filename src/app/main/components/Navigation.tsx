import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../App.context'
import { useCheckPermission } from '../../user/hooks/permissions.hooks'
import { useHistory } from 'react-router-dom'
import { Button as MatButton } from '@material-ui/core'

const Button = styled(MatButton)``

const Navigation = ({ ...props }) => {
  const history = useHistory()
  const { permissions } = useContext(AppContext)
  const { hasRole, hasClearance, hasKey } = useCheckPermission()

  const handleClick = (route: string) => history.push(route)

  return (
    <div className={props.className}>
      <nav>
        <Button onClick={() => handleClick('/home')}>Home</Button>
        <Button onClick={() => handleClick('/users')}>User</Button>
      </nav>
    </div>
  )
}

export default styled(Navigation)`
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
