import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import { useObservable } from 'rxjs-hooks'

export const useUI = () => {
  const isMobile = useObservable(
    () =>
      fromEvent(window, 'resize').pipe(
        debounceTime(100),
        map(() => window.innerWidth <= 750),
      ),
    window.innerHeight >= 750,
  )

  return { isMobile }
}
