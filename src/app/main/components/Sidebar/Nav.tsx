import React from 'react'
import { Link } from '../Link'

export const Nav = () => {
  return (
    <>
      <Link to='#' iconName='home' title='Dashboard' />
      <Link to='#' iconName='people' title='Vim' />
      <Link to='#' iconName='calendar' title='VsCode' />
      <Link to='#' iconName='folder' title='Windows' />
      <Link to='#' iconName='reports' title='Bash' />
    </>
  )
}
