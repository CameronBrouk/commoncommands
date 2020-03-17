import React, { useState, createContext } from 'react'

const defaultUser = {}
const defaultPermissions = {
  clearance: 0,
  role: 'visitor',
  keys: [],
}

type context = {
  currentUser: typeof defaultUser
  permissions: typeof defaultPermissions
}

export const AppContext = createContext<Partial<context>>({})

interface Props {
  children: any
}
export const AppProvider = (props: Props) => {
  const [currentUser, setCurrentUser] = useState(defaultUser)
  const [permissions, setPermissions] = useState(defaultPermissions)

  return (
    <AppContext.Provider value={{ currentUser, permissions }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
