import React, { useState } from 'react'
import firebase from 'firebase'
import { useFirestore, User } from '../firebase'
import { useForm } from 'react-hook-form'

export const Login = ({ ...props }: any) => {
  const [error, setError] = useState('')
  const { create, update } = useFirestore<User>('users')

  type FormData = {
    email: string
    password: string
  }
  const handleSubmit = (formData: FormData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .catch(({ message }) => setError(message))
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
