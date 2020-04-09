import React from 'react'
import firebase from 'firebase'
import { useHistory } from 'react-router'
import { useFormValidators } from '../../shared/hooks/formValidators.hooks'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { MatTextField } from '../../shared/components/final-form'
import { Button } from '@material-ui/core'
import { withSnackbar, useSnackbar } from 'notistack'

const Login = ({ ...props }: any) => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { email, min } = useFormValidators()
  const auth = firebase.auth()

  const handleSubmit = (formData: any) => {
    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(user => enqueueSnackbar('Logged In!', { variant: 'success' }))
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  return (
    <div className={props.className}>
      <h1>Login</h1>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, pristine, valid }) => (
          <form onSubmit={handleSubmit}>
            <div className='fields'>
              <Field
                name='email'
                label='email'
                component={MatTextField}
                validate={email}
              />
              <Field
                name='password'
                label='password'
                type='password'
                required
                component={MatTextField}
              />
            </div>
            <div className='buttons'>
              <Button
                disabled={submitting || pristine || !valid}
                type='submit'
                color='primary'
                variant='contained'>
                Login
              </Button>
              <Button type='button' onClick={() => history.push('/register')}>
                Register
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default styled(withSnackbar(Login))`
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .buttons {
    margin-top: 10px;
    align-items: left;
    justify-content: left;
    text-align: left;
  }
`
