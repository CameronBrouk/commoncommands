import { useFirestore } from '../../shared/hooks/firestore.hooks'

export const useSystems = () => {
  const {
    collection: systemCollection,
    getDocument: getSystem,
    getDocument$: getSystem$,
    getCollection: getSystems,
    getCollection$: getSystems$,
    createDocument: createSystem,
    updateDocument: updateSystem,
  } = useFirestore('systems')

  return {
    systemCollection,
    getSystem,
    getSystems,
    createSystem,
    updateSystem,
    getSystem$,
    getSystems$,
  }
}
