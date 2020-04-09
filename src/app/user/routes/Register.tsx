import React, { useContext } from 'react'
import { AppContext } from '../../App.context'
import firebase from 'firebase'
import { useHistory } from 'react-router'
import { useFormValidators } from '../../shared/hooks/formValidators.hooks'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { MatTextField } from '../../shared/components/final-form'
import { Button } from '@material-ui/core'
import { withSnackbar, useSnackbar } from 'notistack'
import { usePermissions } from '../hooks/permissions.hooks'

const Register = ({ ...props }: any) => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPermissions } = useContext(AppContext)
  const { createPermissions } = usePermissions()
  const history = useHistory()
  const { email, min } = useFormValidators()
  const auth = firebase.auth()

  const handleSubmit = (formData: any) => {
    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(userRecord => {
        const { user } = userRecord
        if (user) {
          const permissions = { clearance: 1, role: 'customer', keys: ['user'] }
          createPermissions(user.uid, permissions)
          enqueueSnackbar('Account Created!', { variant: 'success' })
          history.push('/home')
        }
      })
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  return (
    <div className={props.className}>
      <h1>Register</h1>
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
                Register
              </Button>
              <Button type='button' onClick={() => history.push('/login')}>
                Login
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default styled(withSnackbar(Register))`
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
