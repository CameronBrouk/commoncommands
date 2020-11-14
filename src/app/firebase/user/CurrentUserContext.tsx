import React, { createContext, useState, useEffect } from 'react'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'
import { map, filter, switchMap, pluck, tap } from 'rxjs/operators'
import { Permissions, User } from './user.types'
import { authState } from 'rxfire/auth'
import firebase, { FirebaseError } from 'firebase'
import { useFirestore } from '../firestore/useFirestore'

type TCurrentUserContext = {
  user: Partial<firebase.User>
  permissions: Permissions
  logout: () => void
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
  logout: () => {},
}

export const CurrentUserContext = createContext<TCurrentUserContext>(
  defaultContext,
)

export const CurrentUserProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState(defaultUser)
  const [permissions, setPermissions] = useState(defaultPermissions)
  const { getSingle$: getPermissions$ } = useFirestore<Permissions>(
    'permissions',
  )

  useEffect(() => {
    const permissions$ = firebaseUser$
      .pipe(pluck('uid'), switchMap(getPermissions$), tap(setPermissions))
      .subscribe()

    return () => {
      permissions$.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const user$ = firebaseUser$
      .pipe(
        map(user => ({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          email: user.email,
          emailVerified: user.emailVerified,
        })),
        tap(setUser),
      )
      .subscribe()

    return () => {
      user$.unsubscribe()
    }
  }, [])

  const firebaseUser$ = authState(firebase.auth()).pipe(filter(user => !!user))

  const logout = () => {
    firebase.auth().signOut()
    setUser(defaultUser)
    setPermissions(defaultPermissions)
  }

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        permissions,
        logout,
      }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
