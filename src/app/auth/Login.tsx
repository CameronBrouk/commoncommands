import React, { useState } from 'react'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'
import { useRouter } from '../shared/hooks'
import { Input } from '../shared/components'

export const Login = ({ ...props }: any) => {
  const [error, setError] = useState('')
  const { navigateTo } = useRouter()
  const formProps = useForm()

  type FormData = {
    email: string
    password: string
  }
  const onSubmit = (formData: FormData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .catch(({ message }) => setError(message))
  }

  return (
    <div className={props.className}>
      <h1>Login</h1>
      <form onSubmit={formProps.handleSubmit<FormData>(onSubmit)}>
        <Input
          form={formProps}
          label='Email'
          type='email'
          name='email'
          pattern={{
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
            message: 'Invalid Email',
          }}
        />

        <Input
          form={formProps}
          label='Password'
          type='password'
          name='password'
        />

        <div className='buttons'>
          <button className='btn-blue' type='submit'>
            Login
          </button>
          <button className='btn-blue' onClick={() => navigateTo('/register')}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}
