export interface User {
  id: string
  permissionsId?: string
  name: string
  email: string
  phone?: number
  description?: string
}
export const defaultUser: User = {
  id: '',
  name: 'Unnamed User',
  email: '',
}
