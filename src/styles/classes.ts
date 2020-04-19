import { makeStyles } from '@material-ui/core'

const primary = '#9C27B0'
const secondary = '#00E676'
const purple = '#635ee7'
const background = '#2e1534'
const bluebackground = '#145'

export const Styles = makeStyles({
  flex: { display: 'flex' },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    textAlign: 'left',
  },
  background: {
    background: background,
    color: 'white',
  },
  radioButton: {
    color: 'white',
  },
  // Table
  table: {
    border: 'none',
    boxShadow: 'none',
  },
  colHeader: {
    color: 'darkgrey',
    fontStyle: 'italic',
  },
  searchField: {
    height: '10vh',
    width: '95%',
    margin: '0 auto',
  },
  // Home Page
  home: {
    flexGrow: 1,
  },
  tabs: {
    backgroundColor: background,
    display: 'relative',
    height: '100vh',
    width: '100vw',
  },
  desktopPanel: {
    margin: '0 auto',
    width: '70%',
  },
  commandsTitle: {
    color: 'white',
    fontSize: '1em',
    margin: '10px 0',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  searchFab: {
    position: 'absolute',
    right: '0',
    bottom: '0',
  },
  commands: {
    display: 'relative',
  },
  // commandsTitle: {
  //   color: 'white',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   textAlign: 'center',
  // },
})
