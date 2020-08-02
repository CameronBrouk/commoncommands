import { useFirestore } from '../firestore/useFirestore'
import { Permissions, Clearance, Role, Group } from './user.types'
import { CurrentUserContext } from './CurrentUserContext'
import * as R from 'ramda'
import { useContext } from 'react'

/**
 * This hook exposes helper functions that allow you to change a users
 * permissions, or check whether a user has a certain permission.
 * @warning This hook can only be used inside of a component wrapped with CurrentUserContext
 */
export const usePermissions = () => {
  const { permissions, user } = useContext(CurrentUserContext)
  const { update: updatePermissions } = useFirestore<Permissions>('permissions')

  const { groups, role, clearance } = permissions
  const { uid } = user

  // I am using firebase.User as a type, and they have uid as 'string | null'
  // Typescript throws an error in each function because uid Might not exists.
  // this entire hook can't be used unless a user is logged in, which means a uid
  // will always exist.  I'm not adding a conditional to every function just to
  // satisfy typescript.  This may be bad practice, but in this instance I will
  // choose a cleaner implementation over "safer" code.  fight me.
  const id = uid || ''

  const addKey = (group: Group) =>
    updatePermissions(id, { groups: R.uniq([...groups, group]) })

  const removeKeys = (...group: Group[]) =>
    updatePermissions(id, { groups: R.without([...group], groups) })

  const changeClearance = (clearance: Clearance) =>
    updatePermissions(id, { clearance })

  const changeRole = (role: Role) => updatePermissions(id, { role })

  const hasRole = (requiredRole: Role) => role === requiredRole

  const hasClearance = (requiredClearance: Clearance) =>
    clearance >= requiredClearance

  const hasGroup = (groupRequired: Group) => groups.includes(groupRequired)

  const isLoggedIn = () => permissions.role !== 'visitor'

  return {
    addKey,
    removeKeys,
    changeClearance,
    changeRole,
    hasRole,
    hasClearance,
    hasGroup,
    isLoggedIn,
  }
}
