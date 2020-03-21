import React, { useState, useMemo, createContext, useEffect } from 'react'
import { Permissions, defaultUser, defaultPermissions } from './user/models'
import { usePermissions } from './user/hooks'
import firebase from 'firebase'

export const AppContext = createContext({
  currentUser: defaultUser,
  permissions: defaultPermissions,
  uid: '',
})

export const AppProvider = ({ children }: any) => {
  const [uid, setUid] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<any>(defaultUser)
  const [permissions, setPermissions] = useState(defaultPermissions)
  const { getPermissions } = usePermissions()

  useMemo(
    () =>
      firebase
        .auth()
        .signInWithEmailAndPassword('testuser@gmail.com', 'password'),
    [],
  )

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setContextFromUser)
  }, [])

  const setContextFromUser = (user: any) => {
    if (user) {
      setUid(user.uid)

      setCurrentUser({
        uid: user.uid,
        displayname: user.displayName,
        photoUrl: user.photoUrl,
        phone: user.phoneNumber,
        email: user.email,
      })

      getPermissions(user.uid)
        .then(e => {
          const data = e.data()
          setPermissions(data as Permissions)
        })
        .catch(e => console.log('err', e))
    } else {
      console.log('no current user')
    }
  }

  return (
    <AppContext.Provider value={{ currentUser, permissions, uid }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
