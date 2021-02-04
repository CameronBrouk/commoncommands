export type CollectionNames = 'users' | 'permissions'

export type Document<T> = T & {
  id: string
  owner: string
  deleted?: boolean
  createdAt: string
  updatedAt: string
}

export type Keys<T> = keyof T extends string ? keyof T : string
export type FirestoreWhere<T> = [Keys<T>, firebase.firestore.WhereFilterOp, any]
export type QueryParams<T> = {
  where?: FirestoreWhere<T>[]
  orderBy?: keyof T
  limit?: number
}

export type DocData = firebase.firestore.DocumentData
export type CollectionRef = firebase.firestore.CollectionReference<DocData>
export type FirestoreQuery = firebase.firestore.Query<DocData>
export type Query = FirestoreQuery | CollectionRef
