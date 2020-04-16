import { useFirestore } from '../../shared/hooks/firestore.hook'

export const useCommands = () => {
  const {
    collection: commandCollection,
    getDocument: getCommand,
    getDocument$: getCommand$,
    getCollection: getCommands,
    getCollection$: getCommands$,
    createDocument: createCommand,
    updateDocument: updateCommand,
  } = useFirestore('commands')

  return {
    commandCollection,
    getCommand,
    getCommands,
    createCommand,
    updateCommand,
    getCommand$,
    getCommands$,
  }
}
