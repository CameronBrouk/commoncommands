import { usePermissions } from './permissions.hooks'
import * as firebase from 'firebase'

type UserCredential = firebase.auth.UserCredential

export const useAuth = () => {
  const auth = firebase.auth()
  const { updatePermissions } = usePermissions()

  const emailRegister = (email: string, password: string) =>
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential: UserCredential) => {
        const { user } = userCredential
        if (user) {
          const uid = user.uid
          updatePermissions(uid, {
            clearance: 1,
            role: 'customer',
            keys: [],
          })
        }
      })
      .catch(err => {
        console.log(err)
      })

  const emailLogin = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password)
  }

  return { emailRegister, emailLogin }
}
