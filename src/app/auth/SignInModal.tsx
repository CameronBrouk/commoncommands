import React, { useState } from 'react'
import { Modal, Button } from 'app/shared/components'
import { Login } from './Login'
import { Register } from './Register'

type Props = {
  isVisible: boolean
  onClose: () => void
}
export const SignInModal = (props: Props) => {
  const [modalState, setModalState] = useState<'login' | 'register'>('login')

  return (
    <Modal {...props}>
      <h2 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>
        {modalState === 'login' && 'Sign in to your account'}
        {modalState === 'register' && 'Create an Account'}
      </h2>

      {modalState === 'login' && (
        <Login
          switchToRegister={() => setModalState('register')}
          afterLogin={props.onClose}
        />
      )}

      {modalState === 'register' && (
        <Register
          switchToSignin={() => setModalState('login')}
          afterRegister={props.onClose}
        />
      )}
    </Modal>
  )
}
