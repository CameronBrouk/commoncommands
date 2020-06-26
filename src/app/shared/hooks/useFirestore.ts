import {docData, collectionData} from 'rxfire/firestore'
import {useObservable} from 'rxjs-hooks'
import {map} from 'rxjs/operators'
import {useParams} from 'react-router'
import firebase from 'firebase'

type CollectionNames = 'users' | 'permissions' | 'profiles'

interface Document {
  id: ID
  deleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

/**
 * This hook is the single source of truth for API requests to the firestore database in this application, and is meant to be extended
 * It is a shorthand way to get the base api functions for any new collection.  See 'users/hooks/usePermissions' for an example
 * @param firestoreCollection name of the collection in firebase firestore
 */
export default function useFirestore<T extends Document>(
  firestoreCollection: CollectionNames,
) {
  const collection = firebase.firestore().collection(firestoreCollection)

  const handleSuccess = (docData: any) => docData
  const handleError = (error: any) => console.log('error', error)

  const getCollection = () =>
    collection.get().then(handleSuccess).catch(handleError)

  const getCollection$ = () =>
    collectionData<T>(collection).pipe(
      // Only Show Collections that Haven't been 'deleted'
      map((data) => data.filter((data) => !data.deleted)),
    )

  const getDocument = (id: string): Promise<T> =>
    collection.doc(id).get().then(handleSuccess).catch(handleError)

  const getDocument$ = (id: string) => docData<T>(collection.doc(id))

  const createDocument = (data: T) =>
    collection
      .add(data)
      .then(({id}) => {
        // Add the ID and a CreatedAt to the documents data
        updateDocument(id, {
          id: id,
          createdAt: new Date(),
        } as Partial<T>)
      })
      .catch(handleError)

  const createDocumentWithId = (id: string, data: T) =>
    collection.doc(id).set(data).then(handleSuccess).catch(handleError)

  const updateDocument = (id: string, data: Partial<T>): Promise<T> =>
    collection
      .doc(id)
      .update({...data, updatedAt: new Date()})
      .then(handleSuccess)
      .catch(handleError)

  const deleteDocument = (id: string) =>
    collection.doc(id).update({deleted: true, updatedAt: new Date()})

  return {
    collection,
    getCollection,
    getCollection$,
    getDocument,
    getDocument$,
    createDocument,
    createDocumentWithId,
    updateDocument,
    deleteDocument,
  }
}

/** Grab Document from the specified collection whos id is equal to the id in route params*/
export const useDocumentFromRouteParams = (collection: CollectionNames) => {
  const {getDocument$} = useFirestore(collection)
  const {id} = useParams<any>()

  const document = useObservable(() => getDocument$(id))

  return document
}
