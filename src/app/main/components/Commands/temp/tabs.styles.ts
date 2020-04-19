import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles'

export const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      // backgroundColor: '#145',
      backgroundColor: '#635ee7',
    },
  },
})

export const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color: '#fff',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
    },
  }),
)

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  customTabs: {
    backgroundColor: '#145',
    // backgroundColor: '#2e1534',
    height: '100vh',
  },
  paddingBottom: {
    paddingBottom: '10px',
  },
}))
