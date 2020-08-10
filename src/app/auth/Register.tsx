import React, { useState } from 'react'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'
import { Permissions, useFirestore, User } from '../firebase'
import { Input } from 'app/shared/components'
import { useRouter } from 'app/shared/hooks'

type Props = {
  afterRegister?: (user: any) => void
}
export const Register = ({ afterRegister }: Props) => {
  const [error, setError] = useState('')
  const { create: createPermissions } = useFirestore<Permissions>('permissions')
  const { create: createUser } = useFirestore<User>('users')
  const { navigateTo } = useRouter()
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
    <div>
      <h1 className='text-xl'>Register</h1>

      <form
        onSubmit={formProps.handleSubmit<FormData>(onSubmit)}
        className='flex flex-col'>
        <Input
          className='flex m-1'
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
          className='flex m-1'
          form={formProps}
          label='Password'
          type='password'
          name='password'
        />

        {error && <p className='text-red-400'>{error}</p>}

        <div className='buttons'>
          <button className='m-1 btn-blue' type='submit'>
            Login
          </button>
          <button
            className='m-1 btn-blue'
            onClick={() => navigateTo('/register')}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}
