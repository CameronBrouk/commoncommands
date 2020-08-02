import { useObservable } from 'rxjs-hooks'
import { useParams } from 'react-router'
import { CollectionNames } from './firestore.types'
import { useFirestore } from './useFirestore'

/** Grab Document from the specified collection whos id is equal to the id in route params*/
export const useDocumentFromRouteParams = (collection: CollectionNames) => {
  const { getSingle$ } = useFirestore(collection)
  const { id } = useParams<any>()

  const document = useObservable(() => getSingle$(id))

  return document
}
