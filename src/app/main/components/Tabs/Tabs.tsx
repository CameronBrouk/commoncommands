import React from 'react'
import { Tabs as MatTabs, Tab as MatTab, Typography } from '@material-ui/core'

import * as Style from './tabs.styles'

interface TabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}
export const Tabs = Style.StyledTabs((props: TabsProps) => (
  <MatTabs {...props} centered TabIndicatorProps={{ children: <div /> }} />
))

interface TabProps {
  label: string
}
export const Tab = Style.StyledTab((props: TabProps) => (
  <MatTab disableRipple {...props} />
))

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}
export const TabPanel = (props: TabPanelProps) => {
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
