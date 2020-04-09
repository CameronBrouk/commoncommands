import React, { createContext } from 'react'
import { useObservable } from 'rxjs-hooks'
import { from, of, combineLatest } from 'rxjs'
import { map, tap, filter, pluck, withLatestFrom } from 'rxjs/operators'
import { useProfile, usePermissions } from '../hooks'

export const ProfileContext = createContext({
  profiles: [],
  permissions: [],
})

export const ProfileProvider = () => {
  const { getPermissionsList$ } = usePermissions()
  const { getProfiles$ } = useProfile()

  const profiles = useObservable(state$ => {
    const permissions$ = getPermissionsList$()
    const profiles$ = getProfiles$()

    return combineLatest(permissions$, profiles$).pipe(
      map(([...state]) => {
        const [permissions, profiles] = state
        return {
          ...permissions,
          ...profiles,
        }
      }),
    )
  })
}
