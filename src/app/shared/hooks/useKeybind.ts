import { useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { filter, tap, pluck } from 'rxjs/operators'

// This List is Not Exhaustive, but Native Keyboard Event
// does not display a specific type
// prettier-ignore
type keycode = 'Escape' | 'Enter' | 'Control' | 'Alt' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp' | 'Tab' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

export const useKeybind = (key: keycode, onPress: () => void) => {
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
