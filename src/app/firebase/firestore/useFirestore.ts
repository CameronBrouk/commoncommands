import firebase from 'firebase'
import { docData, collectionData } from 'rxfire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CollectionNames, Document } from './firestore.types'

/**
 * This hook is the single source of truth for API requests to the firestore database in this application, and is meant to be extended
 * It is a shorthand way to get the base api functions for any new collection.  See 'users/hooks/usePermissions' for an example
 * @param firestoreCollection name of the collection in firebase firestore
 */
export function useFirestore<T>(firestoreCollection: CollectionNames) {
  // Type Declarations
  type Doc = Document<T>
  let remove: (id: string) => Promise<void>
  let update: (id: string, data: Partial<Doc>) => Promise<void>
  let create: (id: string, data: T) => Promise<void>
  let getSingle$: (id: string) => Observable<Doc>
  let hardDelete: (id: string) => Promise<void>
  let list$: Observable<Omit<Doc, 'deleted'>[]>

  // shared / single use functions
  const collection = firebase.firestore().collection(firestoreCollection)
  const getDocument = (id: string) => collection.doc(id)
  const filterDeleted = (data: Doc[]) => data.filter(({ deleted }) => !deleted)
  const date = () => new Date().toDateString()

  // Exports
  list$ = collectionData<Doc>(collection).pipe(map(filterDeleted))

  getSingle$ = id => docData<Doc>(collection.doc(id))

  create = async (id, data) =>
    await getDocument(id).set({ ...data, createdAt: date(), updatedAt: date() })

  update = async (id, data) =>
    await getDocument(id).update({ ...data, updatedAt: date() })

  remove = async id =>
    await getDocument(id).update({ deleted: true, updatedAt: date() })

  hardDelete = async id => await getDocument(id).delete()

  return {
    list$,
    getSingle$,
    create,
    update,
    remove,
    hardDelete,
  }
}
