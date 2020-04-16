import { docData, collectionData } from 'rxfire/firestore'
import { useObservable } from 'rxjs-hooks'
import { useParams } from 'react-router'
import firebase from 'firebase'

const handleSuccess = (document: any) => document
const handleError = (error: any) => console.log('error', error)

export const useFirestore = (firestoreCollection: string) => {
  const collection = firebase.firestore().collection(firestoreCollection)

  const getCollection = () =>
    collection.get().then(handleSuccess).catch(handleError)
  const getCollection$ = <T>() => collectionData<T>(collection)

  const getDocument = (id: string) =>
    collection.doc(id).get().then(handleSuccess).catch(handleError)

  const getDocument$ = <T>(id: string) => docData<T>(collection.doc(id))

  const createDocument = <T>(data: T) =>
    collection
      .add(data)
      .then(documentRef => {
        const { id } = documentRef
        updateDocument(id, { id: id })
        return documentRef
      })
      .catch(handleError)

  const createDocumentWithId = <T>(id: string, data: T) =>
    collection.doc(id).set(data).then(handleSuccess).catch(handleError)

  const updateDocument = <T>(id: string, data: T) =>
    collection.doc(id).update(data).then(handleSuccess).catch(handleError)

  const deleteDocument = (id: string) =>
    collection.doc(id).delete().then(handleSuccess).catch(handleError)

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

type DocumentData = firebase.firestore.DocumentData
type Collection = firebase.firestore.CollectionReference<DocumentData>
type FirestoreQuery = firebase.firestore.Query<DocumentData>
type DocumentSnapshot = firebase.firestore.QuerySnapshot<DocumentData>
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<
  DocumentData
>[]
// export const usePaginatedCollection = (firestoreCollection: Collection) => {
//   const [pageNumber, setPageNumber] = useState(1)

// const pageUp = setPageNumber(currentPage => currentPage + 1)
// const pageDown = setPageNumber(currentPage => currentPage - 1)

// const firstPage = firestoreCollection.limit(25)

// const list = useObservable(() =>
//   collectionData(
//     firestoreCollection
//       .startAt(pageNumber === 1 ? 0 : (pageNumber - 1) * 25)
//       .endAt(pageNumber * 25),
//   ),
//   [],
//   [pageNumber]
// )

// var first = db.collection("cities")
//         .orderBy("population")
//         .limit(25);

// return first.get().then(function(documentSnapshots) {
// Get the last visible document
// var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
// console.log('last', lastVisible)

// Construct a new query starting at this document,
// get the next 25 cities.
// var next = db
//   .collection('cities')
//   .orderBy('population')
//   .startAfter(lastVisible)
//   .limit(25)
// })
// }

export const useDocument$ = (id: string, collection: string) => {
  const { getDocument$ } = useFirestore(collection)

  const document = useObservable(() => getDocument$(id))

  return document
}

/** Grab Document from the specified collection whos id is equal to the id in route params*/
export const useDocumentFromRouteParams = (collection: string) => {
  const { id } = useParams<any>()

  return useDocument$(id, collection)
}

/** Grabs a document from the specefied collection whose documentId is equal to the current User Id */
// export const useUserOwnedDocument = (collection: string) => {
//   const { getDocument } = useFirestore(collection)
//   const { uid } = useContext(AppContext)
//   const id = '1'
//   const { id } = useCurrentUser()

//   const document = useObservable(() => getDocument(uid))

//   return document
// }