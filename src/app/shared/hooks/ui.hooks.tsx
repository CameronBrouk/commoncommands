import React from 'react'
import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import { useObservable } from 'rxjs-hooks'
import { VariantType, useSnackbar } from 'notistack'

export const useUI = () => {
  // const { enqueueSnackbar } = useSnackbar()

  const isMobile = useObservable(
    () =>
      fromEvent(window, 'resize').pipe(
        debounceTime(100),
        map(() => window.innerWidth <= 750),
      ),
    window.innerWidth <= 750,
  )

  // const showSnackbar = (variant: VariantType) => (message: string) =>
  //   enqueueSnackbar(message, { variant })

  // const showDefault = showSnackbar('default')
  // const showSuccess = showSnackbar('success')
  // const showError = showSnackbar('error')
  // const showWarning = showSnackbar('warning')
  // const showInfo = showSnackbar('info')

  return {
    isMobile,
    // showDefault,
    // showSuccess,
    // showError,
    // showWarning,
    // showInfo,
  }
}
