import React, { useState } from 'react'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'
import { Permissions, useFirestore, User } from '../firebase'
import { Input, Button } from 'app/shared/components'

type Props = {
  afterRegister?: (user: any) => void
  switchToSignin: () => void
}
export const Register = ({ afterRegister, switchToSignin }: Props) => {
  const [error, setError] = useState('')
  const { create: createPermissions } = useFirestore<Permissions>('permissions')
  const { create: createUser } = useFirestore<User>('users')
  const formProps = useForm()
  const auth = firebase.auth()

  type FormData = {
    email: string
    password: string
  }
  const onSubmit = (formData: FormData) => {
    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(({ user }) => {
        if (user) {
          createPermissions(user.uid, {
            clearance: 1,
            role: 'customer',
            groups: ['user'],
          })

          createUser(user.uid, {
            email: user.email || '',
            emailVerified: user.emailVerified,
            uid: user.uid,
            displayName: user.displayName || '',
            phone: user.phoneNumber || '',
            photoUrl: user.photoURL || '',
          })

          if (!!afterRegister) afterRegister(user)
        }
      })
      .catch(({ message }) => setError(message))
  }

  return (
    <form onSubmit={formProps.handleSubmit<FormData>(onSubmit)}>
      <Input
        form={formProps}
        label='Email'
        type='email'
        name='email'
        required
        autoFocus
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

      <Button type='button' onClick={switchToSignin} className='ml-2'>
        Sign In
      </Button>
    </form>
  )
}
