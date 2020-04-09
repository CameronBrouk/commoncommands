import React, { useState, useMemo, createContext, useEffect } from 'react'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'
import { tap, map, filter, pluck, switchMap } from 'rxjs/operators'
import { Permissions, defaultUser, defaultPermissions } from './user/models'
import { authState } from 'rxfire/auth'
import { usePermissions } from './user/hooks'
import firebase from 'firebase'

const defaultContext = {
  uid: '',
  currentUser: defaultUser,
  permissions: defaultPermissions,
}

export const AppContext = createContext<any>(defaultContext)

export const AppProvider = ({ children }: any) => {
  const { getPermissions$ } = usePermissions()

  const state = useObservable(() => {
    const loggedIn$ = authState(firebase.auth()).pipe(filter(user => !!user))

    const uid$ = loggedIn$.pipe(map(user => user.uid))

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
  }, defaultContext as any)

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
