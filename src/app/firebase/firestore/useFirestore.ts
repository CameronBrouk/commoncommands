import firebase from 'firebase'
import { useContext } from 'react'
import { docData, collectionData } from 'rxfire/firestore'
import { map } from 'rxjs/operators'
import { CurrentUserContext } from '../user'
import { CollectionNames, Document } from './firestore.types'

/**
 * This hook is the single source of truth for API requests to the firestore database in this application, and is meant to be extended
 * It is a shorthand way to get the base api functions for any new collection.  See 'users/hooks/usePermissions' for an example
 * @param firestoreCollection name of the collection in firebase firestore
 */
export function useFirestore<T>(firestoreCollection: CollectionNames) {
  // Type Declarations
  type Doc = Document<T>
  const { user } = useContext(CurrentUserContext)

  // shared / single use functions
  const collection = firebase.firestore().collection(firestoreCollection)
  const getDocument = (id: string) => collection.doc(id)
  const filterDeleted = (data: Doc[]) => data.filter(({ deleted }) => !deleted)
  const date = () => new Date().toDateString()

  // Exports
  const list$ = collectionData<Document<T>>(collection).pipe(map(filterDeleted))

  /** Get a Single Document from Firestore */
  const getSingle$ = (id: string) => docData<Doc>(collection.doc(id))

  const createId = () => collection.doc().id

  /** Create a new record */
  const create = async (id: string, data: T) =>
    await getDocument(id).set({
      ...data,
      createdAt: date(),
      updatedAt: date(),
      id: id,
    })

  const createWithId = async (data: T) => {
    const doc = await collection.add({
      ...data,
      createdAt: date(),
      updatedAt: date(),
    })

    getDocument(doc.id).update({ ...data, id: doc.id, owner: user.uid || '' })
    return doc.id
  }

  /** Update an existing record */
  const update = async (id: string, data: Partial<T>) =>
    await getDocument(id).update({ ...data, updatedAt: date() })

  /** Add the deleted flag to a record */
  const remove = async (id: string) =>
    await getDocument(id).update({ deleted: true, updatedAt: date() })

  /** delete the record from the database */
  const hardDelete = async (id: string) => await getDocument(id).delete()

  return {
    collection,
    list$,
    getSingle$,
    create,
    createWithId,
    update,
    remove,
    hardDelete,
    createId,
  }
}
