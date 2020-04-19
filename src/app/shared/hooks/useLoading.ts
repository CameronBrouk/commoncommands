import React, { useContext } from 'react'
import { AppContext } from '../../App.context'
import { BehaviorSubject } from 'rxjs'

const useLoading = () => {
  const { loading$ } = useContext(AppContext)

  const startLoading = () => loading$.next(true)
  const stopLoading = () => loading$.next(false)

  return { startLoading, stopLoading }
}

export default useLoading
