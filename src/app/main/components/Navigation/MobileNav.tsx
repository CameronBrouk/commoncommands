import React from 'react'
// import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ListIcon from '@material-ui/icons/List'
import { useCheckPermission } from '../../../user/hooks/permissions.hooks'

import * as Helper from './nav.helpers'
import * as Constant from './nav.constants'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
})

const MobileNav = () => {
  const history = useHistory()
  const classes = useStyles()
  const { hasClearance } = useCheckPermission()
  const [value, setValue] = React.useState('/home')

  const handleChange = (event: any, newValue: any) => setValue(newValue)

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}>
      {Constant.routes.map(route => (
        <BottomNavigationAction
          label={route.label}
          value={route.path}
          icon={route.icon}
          onClick={() => history.push(route.path)}
        />
      ))}
      {/* <BottomNavigationAction
        label={hasClearance(1) ? 'users' : 'login'}
        value='users'
        onClick={() => history.push(`/${hasClearance(1) ? 'users' : 'login'}`)}
        icon={<PeopleIcon />}
      /> */}
    </BottomNavigation>
  )
}

export default MobileNav
