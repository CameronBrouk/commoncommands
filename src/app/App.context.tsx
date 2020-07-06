import React, { createContext } from 'react'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'
import { map, filter, switchMap, pluck } from 'rxjs/operators'
import { Permissions, defaultPermissions } from './user/models'
import { authState } from 'rxfire/auth'
import firebase from 'firebase'
import { useFirestore } from './shared/hooks'

const defaultContext = {
  uid: '',
  currentUser: {},
  permissions: defaultPermissions,
}

export const AppContext = createContext<typeof defaultContext>(defaultContext)

export const AppProvider = ({ children }: any) => {
  const { getSingle$: getPermissions$ } = useFirestore<Permissions>(
    'permissions',
  )

  const state = useObservable(() => {
    const loggedIn$ = authState(firebase.auth()).pipe(filter(user => !!user))

    const uid$ = loggedIn$.pipe(pluck('uid'))

    const permissions$ = uid$.pipe(switchMap(getPermissions$))

    const currentUser$ = loggedIn$.pipe(
      map(user => ({
        uid: user.uid,
        displayname: user.displayName,
        photoUrl: user.photoURL,
        phone: user.phoneNumber,
        email: user.email,
      })),
    )

    return combineLatest(uid$, currentUser$, permissions$).pipe(
      map(([...state]) => {
        const [uid, currentUser, permissions] = state
        return {
          uid: uid,
          currentUser: currentUser,
          permissions: permissions,
        }
      }),
    )
  }, defaultContext)

  return (
    <AppContext.Provider
      value={{
        uid: state.uid,
        currentUser: state.currentUser,
        permissions: state.permissions,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
