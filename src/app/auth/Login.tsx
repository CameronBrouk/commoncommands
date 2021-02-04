import React, { useState } from 'react'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../shared/components'

type Props = {
  afterLogin?: () => void
  switchToRegister: () => void
}
export const Login = ({ switchToRegister, afterLogin = () => {} }: Props) => {
  const [error, setError] = useState('')
  const formProps = useForm()

  type FormData = {
    email: string
    password: string
  }
  const onSubmit = (formData: FormData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(afterLogin)
      .catch(({ message }) => setError(message))
  }

  return (
    <form onSubmit={formProps.handleSubmit<FormData>(onSubmit)}>
      <Input
        form={formProps}
        label='Email'
        type='email'
        name='email'
        autoFocus
        required
        pattern={{
          value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
          message: 'Invalid Email',
        }}
      />

      <Input
        form={formProps}
        label='Password'
        required
        type='password'
        name='password'
        minLength={8}
      />

      {error && <p className='text-red-400'>{error}</p>}

      <Button type='submit' variant='raised' className='mt-6'>
        Login
      </Button>

      <Button type='button' className='ml-2' onClick={switchToRegister}>
        Create an Account
      </Button>
    </form>
  )
}
