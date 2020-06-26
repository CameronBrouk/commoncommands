import {useFirestore} from '../../shared/hooks'

export const useProfile = () => {
  const {
    collection: profileCollection,
    getDocument: getProfile,
    getDocument$: getProfile$,
    getCollection: getProfiles,
    getCollection$: getProfiles$,
    createDocument: createProfile,
    updateDocument: updateProfile,
  } = useFirestore('profiles')

  return {
    profileCollection,
    getProfile,
    getProfiles,
    createProfile,
    updateProfile,
    getProfile$,
    getProfiles$,
  }
}
