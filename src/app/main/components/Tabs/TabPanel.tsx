import React from 'react'
import { Typography } from '@material-ui/core'

interface Props {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {children}
    </Typography>
  )
}

export default TabPanel
