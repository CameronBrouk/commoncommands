import pipe from 'lodash/fp/flow'
import { from } from 'rxjs'
import firebase from 'firebase'
import { Document, CollectionNames } from './firebase.types'

type FirestoreWhere<T> = [keyof T, firebase.firestore.WhereFilterOp, any]
type QueryParams<T> = {
  where?: FirestoreWhere<T>[]
  orderBy?: keyof T
  limit?: number
}

type DocData = firebase.firestore.DocumentData
type CollectionRef = firebase.firestore.CollectionReference<DocData>
type FirestoreQuery = firebase.firestore.Query<DocData>

/**
 * Builds a filtered firestore query
 * @param  collectionName of the collection in firebase firestore
 */
export function useFirestoreQuery<T>(collectionName: CollectionNames) {
  type Doc = Document<T>
  type Query = FirestoreQuery | CollectionRef

  type BuildQuery = (queryParams: QueryParams<Doc>) => (query: Query) => Query
  type Maybe = (fn: Function, param: any | undefined) => (query: Query) => Query
  type Limit = (limit: number) => (query: Query) => Query
  type Where = (filters: FirestoreWhere<Doc>[]) => (query: Query) => Query
  type OrderBy = (attribute: keyof Doc) => (query: Query) => Query

  const collection = firebase.firestore().collection(collectionName)

  const buildQuery: BuildQuery = queryParams =>
    pipe(
      maybe(where, queryParams.where),
      maybe(orderBy, queryParams.orderBy),
      maybe(limit, queryParams.limit),
    )

  const limit: Limit = limit => query => query.limit(limit)

  // @ts-ignore // firestore native types don't work with generics
  const orderBy: OrderBy = attribute => query => query.orderBy(attribute)

  const where: Where = filters => query =>
    // @ts-ignore // firestore native types don't work with generics
    filters.reduce((newQuery, filter) => newQuery.where(...filter), query)

  const maybe: Maybe = (fn, param) => query =>
    !!param ? fn(param)(query) : query

  const query$ = (queryParams: QueryParams<Doc>) =>
    from(
      buildQuery(queryParams)(collection)
        .get()
        .then(({ docs }) => docs.map(doc => doc.data())),
    )

  return { query$ }
}
