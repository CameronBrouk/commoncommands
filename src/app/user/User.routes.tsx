import React, { useContext } from 'react'
import { AppContext } from '../App.context'

interface Props {
  currentUser: any
}

const User = () => {
  const pageName = 'User'
  const { currentUser, permissions, uid } = useContext(AppContext)

  // console.log('user', currentUser)
  // console.log('permissions', permissions)
  // console.log('uid', uid)

  return (
    <div>
      <p>{pageName} page works</p>
      <p>{uid}</p>
      <p>{permissions.clearance}</p>
    </div>
  )
}

export default User
