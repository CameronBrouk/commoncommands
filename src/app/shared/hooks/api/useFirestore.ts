import { docData, collectionData } from 'rxfire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { useObservable } from 'rxjs-hooks'
import { useParams } from 'react-router'
import firebase from 'firebase'
import { CollectionNames, Document } from './api.types'

/**
 * This hook is the single source of truth for API requests to the firestore database in this application, and is meant to be extended
 * It is a shorthand way to get the base api functions for any new collection.  See 'users/hooks/usePermissions' for an example
 * @param firestoreCollection name of the collection in firebase firestore
 */
export function useFirestore<T>(firestoreCollection: CollectionNames) {
  type Doc = Document<T>
  type Remove = (id: string) => Promise<void>
  type HardDelete = (id: string) => Promise<void>
  type Update = (id: string, data: Partial<Doc>) => Promise<void>
  type Create = (id: string, data: T) => Promise<void>
  type GetSingle$ = (id: string) => Observable<Doc>
  type List$ = Observable<Omit<Doc, 'deleted'>[]>

  const collection = firebase.firestore().collection(firestoreCollection)
  const getDocument = (id: string) => collection.doc(id)

  const filterDeleted = (data: Doc[]) => data.filter(({ deleted }) => !deleted)
  const date = () => new Date().toDateString()

  const list$: List$ = collectionData<Doc>(collection).pipe(map(filterDeleted))

  const getSingle$: GetSingle$ = id => docData<Doc>(collection.doc(id))

  const create: Create = async (id, data) =>
    await getDocument(id).set({ ...data, createdAt: date(), updatedAt: date() })

  const update: Update = async (id, data) =>
    await getDocument(id).update({ ...data, updatedAt: date() })

  const remove: Remove = async id =>
    await getDocument(id).update({ deleted: true, updatedAt: date() })

  const hardDelete: HardDelete = async id => await getDocument(id).delete()

  return {
    list$,
    getSingle$,
    create,
    update,
    remove,
    hardDelete,
  }
}

/** Grab Document from the specified collection whos id is equal to the id in route params*/
export const useDocumentFromRouteParams = (collection: CollectionNames) => {
  const { getSingle$ } = useFirestore(collection)
  const { id } = useParams<any>()

  const document = useObservable(() => getSingle$(id))

  return document
}
