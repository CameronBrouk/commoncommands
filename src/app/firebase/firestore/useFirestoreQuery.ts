// @ts-nocheck
import pipe from 'lodash/fp/flow'
import { from } from 'rxjs'
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

  // Functions
  const buildQuery = (queryParams: QueryParams<Doc>) =>
    pipe(
      ifParam(queryParams.where, where),
      ifParam(queryParams.orderBy, orderBy),
      ifParam(queryParams.limit, limit),
    )

  const limit = (limit: number) => (query: Query) => query.limit(limit)

  const orderBy = (attribute: Keys<Doc>) => (query: Query) =>
    query.orderBy(attribute)

  const where = (filters: FirestoreWhere<Doc>[]) => (query: Query) =>
    filters.reduce((newQuery, filter) => newQuery.where(...filter), query)

  const ifParam = (param: any | undefined, fn: Function) => (query: Query) =>
    !!param ? fn(param)(query) : query

  const query = async (queryParams: QueryParams<Doc>) =>
    await buildQuery(queryParams)(collection)
      .get()
      .then(({ docs }) => docs.map(doc => doc.data() as Doc))

  // const query$ = from(query)

  return { query }
}
