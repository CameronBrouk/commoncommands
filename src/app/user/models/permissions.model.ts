export interface Permissions {
  id?: string
  clearance: number
  role: string
  keys: string[]
}

export const defaultPermissions: Permissions = {
  clearance: 0,
  role: 'visitor',
  keys: [],
}
