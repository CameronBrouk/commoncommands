import { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { takeWhile, tap, filter } from 'rxjs/operators'

export const useClickOutside = (isOpen: boolean, handleClick: () => void) => {
  const menuRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const divElement = menuRef?.current
    const clickOutsideMenu$ = fromEvent(document, 'mousedown')
      .pipe(
        takeWhile(() => isOpen),
        filter(() => isOpen && !!divElement),
        filter(clickedParentElement(divElement)),
        filter(clickedOutsideElement(divElement)),
        tap(handleClick),
      )
      .subscribe()

    return () => {
      clickOutsideMenu$.unsubscribe()
    }
  }, [isOpen, handleClick])

  return menuRef
}

const clickedOutsideElement = (element: HTMLElement | null) => (event: Event) =>
  !element?.contains(event.target as Node)

const clickedParentElement = (element: HTMLElement | null) => (event: Event) =>
  !element?.previousElementSibling?.contains(event.target as Node)
