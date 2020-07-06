export interface Permissions {
  clearance: number
  role: string
  groups: string[]
}

export const defaultPermissions: Permissions = {
  clearance: 0,
  role: 'visitor',
  groups: [],
}
