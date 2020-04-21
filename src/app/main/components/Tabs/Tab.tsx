import React from 'react'
import { Tab as MatTab } from '@material-ui/core'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  label: string
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      // textTransform: 'none',
      background: '#eee',
      color: 'black',
      // fontWeight: theme.typography.fontWeightRegular,
      // fontSize: theme.typography.pxToRem(15),
      // marginRight: theme.spacing(1),
      // '&:focus': {
      //   opacity: 1,
      // },
    },
  }),
)

export default StyledTab((props: Props) => <MatTab disableRipple {...props} />)
