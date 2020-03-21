import { useFirestore } from '../../shared/hooks/firestore.hook'

export const useUser = () => {
  const {
    getDocument: getUser,
    getDocument$: getUser$,
    getCollection: getUsers,
    getCollection$: getUsers$,
    createDocument: createUser,
    updateDocument: updateUser,
  } = useFirestore('users')

  return {
    getUser,
    getUsers,
    createUser,
    updateUser,
    getUser$,
    getUsers$,
  }
}
