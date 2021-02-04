import { useFirestore, User } from 'app/firebase'
import React from 'react'
import { useObservable } from 'rxjs-hooks'
import { UserCard } from './components/UserCard'

export const Users = () => {
  const { list$: usersList$ } = useFirestore<User>('users')
  const users = useObservable(() => usersList$, [])

  return (
    <div className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3'>
      {users.map((user, i) => (
        <UserCard user={user} index={i} />
      ))}
    </div>
  )
}
