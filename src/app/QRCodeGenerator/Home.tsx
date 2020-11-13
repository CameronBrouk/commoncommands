import { Login, Register } from 'app/auth'
import { usePermissions, useRouter } from 'app/shared/hooks'
import React, { useEffect, useState } from 'react'

export const Home = () => {
  const { navigateTo } = useRouter()
  const { isLoggedIn } = usePermissions()
  const [loggingIn, setLoggingIn] = useState(true)

  useEffect(() => {
    if (isLoggedIn()) navigateTo('dashboard')
  })

  return (
    <div className='mx-auto px-60'>
      <h1 className='flex justify-center py-4 text-3xl font-medium leading-6 text-cool-gray-900'>
        {loggingIn ? 'QRCadia Sign In' : 'Create An Account with QRCadia'}
      </h1>
      {loggingIn && (
        <Login
          switchToRegister={() => setLoggingIn(false)}
          afterLogin={() => navigateTo('dashboard')}
        />
      )}
      {!loggingIn && (
        <Register
          switchToSignin={() => setLoggingIn(true)}
          afterRegister={() => navigateTo('/awaiting-approval')}
        />
      )}
    </div>
  )
}
