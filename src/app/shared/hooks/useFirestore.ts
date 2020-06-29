import { docData, collectionData } from 'rxfire/firestore'
import { useObservable } from 'rxjs-hooks'
import { map } from 'rxjs/operators'
import { useParams } from 'react-router'
import firebase from 'firebase'

export type CollectionNames =
  | 'users'
  | 'permissions'
  | 'profiles'
  | 'commands'
  | 'systems'

export interface DocumentDefaults {
  id: string
  deleted?: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * This hook is the single source of truth for API requests to the firestore database in this application, and is meant to be extended
 * It is a shorthand way to get the base api functions for any new collection.  See 'users/hooks/usePermissions' for an example
 * @param firestoreCollection name of the collection in firebase firestore
 */
export function useFirestore<T>(firestoreCollection: CollectionNames) {
  type Doc = T & DocumentDefaults
  const collection = firebase.firestore().collection(firestoreCollection)

  const filterDeleted = (data: Doc[]) => data.filter(({ deleted }) => !deleted)

  const getList$ = () =>
    collectionData<Doc>(collection).pipe(map(filterDeleted))

  const getSingle$ = (id: string) => docData<T>(collection.doc(id))

  const create = async (data: Omit<T, 'id'>) => {
    const { id } = await collection.add(data)
    return await collection.doc(id).update({ id: id, createdAt: new Date() })
  }

  const createWithId = (id: string, data: T) => collection.doc(id).set(data)

  const update = async (id: string, data: Partial<T>) =>
    await collection.doc(id).update({ ...data, updatedAt: new Date() })

  const remove = (id: string) =>
    collection.doc(id).update({ deleted: true, updatedAt: new Date() })

  return {
    collection,
    getList$,
    getSingle$,
    create,
    createWithId,
    update,
    remove,
  }
}

/** Grab Document from the specified collection whos id is equal to the id in route params*/
export const useDocumentFromRouteParams = (collection: CollectionNames) => {
  const { getSingle$ } = useFirestore(collection)
  const { id } = useParams<any>()

  const document = useObservable(() => getSingle$(id))

  return document
}
