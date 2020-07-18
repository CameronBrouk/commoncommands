import React from 'react'
import firebase from 'firebase'
import { useHistory } from 'react-router'
// import { email, min } from '../../shared/utils/form-validators'

const Login = ({ ...props }: any) => {
  const history = useHistory()
  const auth = firebase.auth()

  const handleSubmit = (formData: any) => {
    auth.signInWithEmailAndPassword(formData.email, formData.password)
    // .then(user => enqueueSnackbar('Logged In!', { variant: 'success' }))
    // .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
  }

  return (
    <div className={props.className}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='buttons'>
          {/* <Button type='submit' color='primary' variant='contained'>
            Login
          </Button> */}
          {/* <Button type='button' onClick={() => history.push('/register')}>
            Register
          </Button> */}
        </div>
      </form>
    </div>
  )
}

export default Login
