import React, { createContext } from 'react'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'
import { map, filter, switchMap, pluck } from 'rxjs/operators'
import { Permissions, User } from './user.types'
import { authState } from 'rxfire/auth'
import firebase, { FirebaseError } from 'firebase'
import { useFirestore } from '../firestore/useFirestore'

type TCurrentUserContext = {
  user: Partial<firebase.User>
  permissions: Permissions
}

const defaultPermissions: Permissions = {
  clearance: 0,
  role: 'visitor',
  groups: [],
}

const defaultUser: Partial<firebase.User> = {
  uid: '',
  displayName: 'Unnamed User',
  photoURL:
    'https://urbaned.tcnj.edu/wp-content/uploads/sites/85/2019/10/placeholder-profile-1.png',
  phoneNumber: '',
  email: '',
  emailVerified: false,
}

const defaultContext: TCurrentUserContext = {
  user: defaultUser,
  permissions: defaultPermissions,
}

export const CurrentUserContext = createContext<TCurrentUserContext>(
  defaultContext,
)

export const CurrentUserProvider: FC<{}> = ({ children }) => {
  const { getSingle$: getPermissions$ } = useFirestore<Permissions>(
    'permissions',
  )

  const user = useObservable(() => user$, defaultUser as any)
  const permissions = useObservable(() => permissions$, defaultPermissions)

  const firebaseUser$ = authState(firebase.auth()).pipe(filter(user => !!user))

  const permissions$ = firebaseUser$.pipe(
    pluck('uid'),
    switchMap(getPermissions$),
  )

  const user$ = firebaseUser$.pipe(
    map(user => ({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      email: user.email,
      emailVerified: user.emailVerified,
    })),
  )

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        permissions,
      }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
