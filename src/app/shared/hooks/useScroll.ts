import { useState, useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { tap, pluck, take } from 'rxjs/operators'

export const useScroll = () => {
  const [scrolledFromTop, setScrolledFromTop] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(false)

  useEffect(() => {
    const onScroll$ = fromEvent(document, 'scroll')

    const scrolledFromTop$ = onScroll$.subscribe(() => {
      window.pageYOffset > 5
        ? setScrolledFromTop(true)
        : setScrolledFromTop(false)
    })

    const isScrollingDown$ = onScroll$
      .pipe(
        take(2),
        pluck('target', 'body'),
        tap(() => setScrollingDown(true)),
      )
      .subscribe()

    return () => {
      scrolledFromTop$.unsubscribe()
      isScrollingDown$.unsubscribe()
    }
  })

  return { scrolledFromTop, scrollingDown }
}
