import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}))

const MatTextField = ({ input, meta, ...rest }: any) => {
  const classes = useStyles(0)
  return (
    <TextField
      {...input}
      {...rest}
      className={classes.root}
      error={meta.touched && meta.error}
      helperText={meta.touched ? meta.error : ''}
    />
  )
}

export default MatTextField
