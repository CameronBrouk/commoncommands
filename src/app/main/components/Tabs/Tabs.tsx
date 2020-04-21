import React from 'react'
import { Tabs as MatTabs } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    // background: '#eee',
    padding: 0,
    // backgroundColor: 'transparent',
    // '& > div': {
    //   maxWidth: 40,
    //   width: '100%',
    //   backgroundColor: '#635ee7',
    // },
  },
})

interface Props {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

export default StyledTabs((props: Props) => (
  <MatTabs
    {...props}
    centered
    variant='fullWidth'
    TabIndicatorProps={{ children: <div /> }}
  />
))
