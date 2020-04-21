import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import {
  red,
  yellow,
  purple,
  green,
  blue,
  deepOrange,
  blueGrey,
  indigo,
} from '@material-ui/core/colors'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: purple,
      secondary: indigo,
      warning: yellow,
      error: red,
    },
  }),
)

export default theme
