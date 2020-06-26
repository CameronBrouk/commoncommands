import {useFirestore} from '../../shared/hooks'

const useSystems = () => {
  const {
    collection: systemCollection,
    getDocument: getSystem,
    getDocument$: getSystem$,
    getCollection: getSystems,
    getCollection$: getSystems$,
    createDocument: createSystem,
    updateDocument: updateSystem,
    deleteDocument: deleteSystem,
  } = useFirestore('systems')

  return {
    systemCollection,
    getSystem,
    getSystems,
    createSystem,
    updateSystem,
    getSystem$,
    getSystems$,
    deleteSystem,
  }
}

export default useSystems
