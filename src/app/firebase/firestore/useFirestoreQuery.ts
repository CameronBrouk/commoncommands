// @ts-nocheck
import pipe from 'lodash/fp/flow'
import firebase from 'firebase'
import {
  Document,
  CollectionNames,
  Keys,
  FirestoreWhere,
  QueryParams,
  Query,
} from './firestore.types'

/**
 * Builds a filtered firestore query
 * @param  collectionName of the collection in firebase firestore
 */
export function useFirestoreQuery<T>(collectionName: CollectionNames) {
  type Doc = Document<T>

  const collection = firebase.firestore().collection(collectionName)

  // Type Declarations
  let orderBy: (attribute: Keys<Doc>) => (query: Query) => Query
  let limit: (limit: number) => (query: Query) => Query
  let where: (filters: FirestoreWhere<Doc>[]) => (query: Query) => Query
  let ifParam: (param: any | undefined, fn: Function) => (query: Query) => Query
  let buildQuery: (queryParams: QueryParams<Doc>) => (query: Query) => Query

  // Functions
  buildQuery = queryParams =>
    pipe(
      ifParam(queryParams.where, where),
      ifParam(queryParams.orderBy, orderBy),
      ifParam(queryParams.limit, limit),
    )

  limit = limit => query => query.limit(limit)

  orderBy = attribute => query => query.orderBy(attribute)

  where = filters => query =>
    filters.reduce((newQuery, filter) => newQuery.where(...filter), query)

  ifParam = (param, fn) => query => (!!param ? fn(param)(query) : query)

  return async (queryParams: QueryParams<Doc>) =>
    await buildQuery(queryParams)(collection)
      .get()
      .then(({ docs }) => docs.map(doc => doc.data() as Doc))
}
