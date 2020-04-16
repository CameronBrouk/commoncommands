import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'

interface Route {
  path: string
  label: string
  icon: JSX.Element
}
export const routes: Route[] = [
  { path: '/home', label: 'Home', icon: <HomeIcon /> },
  // { path: '/login', label: 'Sign In', icon: <PeopleIcon /> },
]

const loggedInRoutes = []
