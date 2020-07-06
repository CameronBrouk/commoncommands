import React from 'react'
import firebase from 'firebase'
import { Permissions } from '../models'
import { useHistory } from 'react-router'
import { useFirestore } from 'app/shared/hooks'

const Register = ({ ...props }: any) => {
  const { create: createPermissions } = useFirestore<Permissions>('permissions')
  const history = useHistory()
  const auth = firebase.auth()

  const handleSubmit = (formData: any) => {
    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(({ user }) => {
        if (user) {
          createPermissions(user.uid, {
            clearance: 1,
            role: 'customer',
            groups: ['user'],
          })
          history.push('/home')
        }
      })
      .catch(console.log)
  }

  return (
    <div className={props.className}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='buttons'>
          {/* <Button type='submit' color='primary' variant='contained'>
            Register
          </Button> */}
          {/* <Button type='button' onClick={() => history.push('/login')}>
            Login
          </Button> */}
        </div>
      </form>
    </div>
  )
}

export default Register
