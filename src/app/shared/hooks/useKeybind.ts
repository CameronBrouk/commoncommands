import { useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { tap, filter, pluck } from 'rxjs/operators'

// prettier-ignore
type keycode = 'Escape' | 'Enter' | 'Control' | 'Alt' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

export const useKeybind = (key: keycode, onPress: () => any) => {
  const keyPress$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    tap(event => event.preventDefault()),
    pluck('key'),
    filter(keyPressed => keyPressed === key),
    tap(onPress),
  )

  useEffect(() => {
    const keyPresses$ = keyPress$.subscribe()
    return () => {
      keyPresses$.unsubscribe()
    }
  })
}

export default useKeybind
