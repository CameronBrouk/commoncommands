import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button as MatButton,
  AppBar,
  Link as MaterialLink,
} from '@material-ui/core'

const Button = styled(MatButton)``

const Navigation = ({ ...props }) => {
  return (
    <AppBar className={props.className}>
      <nav>
        <ul>
          <li>
            <RouterLink to='/'>
              <Button>Home</Button>
            </RouterLink>
          </li>
          <li>
            <RouterLink to='/user'>
              <Button>User</Button>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </AppBar>
  )
}

export default styled(Navigation)`
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${Button} {
    color: white;
  }
`
