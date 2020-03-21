import { useContext } from 'react'
import { useFirestore } from '../../shared/hooks/firestore.hook'
import { Permissions } from '../models'
import { AppContext } from '../../App.context'

export const usePermissions = () => {
  const {
    getDocument: getPermissions,
    getDocument$: getPermissions$,
    createDocument: createPermissions,
    updateDocument: updatePermissions,
  } = useFirestore('permissions')

  return {
    getPermissions,
    getPermissions$,
    createPermissions,
    updatePermissions,
  }
}

export const useChangePermissions = (uid: string, permissions: Permissions) => {
  const { updatePermissions } = usePermissions()

  const updateUserPermissions = (data: Partial<Permissions>) =>
    updatePermissions(uid, data)

  const addKey = (key: string) => {
    const { keys } = permissions
    const isDuplicate = keys.includes(key)
    const newKeys = isDuplicate ? keys : [...keys, key]
    updateUserPermissions({ keys: newKeys })
  }

  const removeKey = (keyToRemove: string) => {
    const { keys } = permissions
    const newKeys = keys.filter((key: string) => key !== keyToRemove)
    updateUserPermissions({ keys: newKeys })
  }

  const changeClearance = (newClearance: number) =>
    updateUserPermissions({ clearance: newClearance })

  const changeRole = (newRole: string) =>
    updateUserPermissions({ role: newRole })

  return { addKey, removeKey, changeClearance, changeRole }
}

export const useCheckPermission = () => {
  const { permissions } = useContext(AppContext)
  const { role, clearance, keys } = permissions

  const hasRole = (requiredRole: string) => role === requiredRole
  const hasClearance = (requiredClearance: number) =>
    clearance >= requiredClearance
  const hasKey = (keyRequired: string) => keys.includes(keyRequired)

  return { hasRole, hasClearance, hasKey }
}
