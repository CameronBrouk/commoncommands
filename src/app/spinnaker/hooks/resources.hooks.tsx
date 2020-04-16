import { useFirestore } from '../../shared/hooks/firestore.hook'

export const useResources = () => {
  const {
    collection: resourcesCollection,
    getDocument: getResources,
    getDocument$: getResources$,
    getCollection: getResourcess,
    getCollection$: getResourcess$,
    createDocument: createResources,
    updateDocument: updateResources,
  } = useFirestore('resourcess')

  return {
    resourcesCollection,
    getResources,
    getResourcess,
    createResources,
    updateResources,
    getResources$,
    getResourcess$,
  }
}
