import { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { takeWhile, tap, filter } from 'rxjs/operators'

const useClickOutside = (isVisible: boolean, handleClick: () => void) => {
  const menuRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const divElement = menuRef?.current
    const clickOutsideMenu$ = fromEvent(document, 'mousedown')
      .pipe(
        takeWhile(() => isVisible),
        filter(() => isVisible && !!divElement),
        filter(event => !divElement?.contains(event.target as Node)),
        filter(
          event => !divElement?.parentElement?.contains(event.target as Node),
        ),
        tap(handleClick),
      )
      .subscribe()

    return () => {
      clickOutsideMenu$.unsubscribe()
    }
  }, [isVisible, handleClick])

  return menuRef
}

export default useClickOutside
