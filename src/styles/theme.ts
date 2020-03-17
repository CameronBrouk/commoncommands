import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { red, yellow, purple, green } from '@material-ui/core/colors'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: purple,
      secondary: green,
      warning: yellow,
      error: red,
    },
  }),
)

export default theme
