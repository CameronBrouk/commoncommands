import { useFirestore } from '../../shared/hooks/useFirestore'

const useCommands = () => {
  const {
    collection: commandCollection,
    getDocument: getCommand,
    getDocument$: getCommand$,
    getCollection: getCommands,
    getCollection$: getCommands$,
    createDocument: createCommand,
    updateDocument: updateCommand,
    deleteDocument: deleteCommand,
  } = useFirestore('commands')

  return {
    commandCollection,
    getCommand,
    getCommands,
    createCommand,
    updateCommand,
    getCommand$,
    getCommands$,
    deleteCommand,
  }
}

export default useCommands
