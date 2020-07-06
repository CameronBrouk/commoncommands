export type CollectionNames =
  | 'users'
  | 'permissions'
  | 'profiles'
  | 'commands'
  | 'systems'

export type Document<T> = T & {
  id: string
  deleted?: boolean
  createdAt: string
  updatedAt: string
}
