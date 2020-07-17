import React from 'react'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'
import { Permissions, useFirestore } from '../firebase'

type Props = {
  afterRegister?: (user: any) => void
}

export const Register: FC<Props> = props => {
  const { create: createPermissions } = useFirestore<Permissions>('permissions')
  const { register, handleSubmit, watch, errors } = useForm()
  const auth = firebase.auth()

  const onSubmit = (formData: any) => {
    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(({ user }) => {
        if (user) {
          createPermissions(user.uid, {
            clearance: 1,
            role: 'customer',
            groups: ['user'],
          })

          !!props.afterRegister && props.afterRegister(user)
        }
      })
      .catch(console.log)
  }

  return (
    <div className={props.className}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
