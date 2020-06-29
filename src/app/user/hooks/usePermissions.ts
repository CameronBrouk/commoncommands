import { useContext } from 'react'
import { useFirestore } from '../../shared/hooks/'
import { AppContext } from '../../App.context'
import { Permissions } from '../models/permissions.model'
import * as R from 'ramda'

export const useChangePermissions = (
  id: string,
  { groups, clearance, role }: Permissions,
) => {
  const { update } = useFirestore<Permissions>('permissions')

  const addKey = (group: string) =>
    update(id, { groups: R.uniq([...groups, group]) })

  const removeKeys = (...group: string[]) =>
    update(id, { groups: R.without([...group], groups) })

  const changeClearance = (clearance: number) => update(id, { clearance })

  const changeRole = (role: string) => update(id, { role })

  return { addKey, removeKeys, changeClearance, changeRole }
}

export const useCheckPermission = () => {
  const { permissions } = useContext(AppContext)
  const { role, clearance, groups } = permissions

  const hasRole = (requiredRole: string) => role === requiredRole

  const hasClearance = (requiredClearance: number) =>
    clearance >= requiredClearance

  const hasKey = (groupRequired: string) => groups.includes(groupRequired)

  const isLoggedIn = () => permissions.role !== 'visitor'

  return { hasRole, hasClearance, hasKey, isLoggedIn }
}
