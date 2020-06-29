import { useEffect } from 'react'
import { tap, pluck } from 'rxjs/operators'
import { fromRefEvent, onlyKeys } from '../../../utils/rxjs'
/**
 *  This Hook Gives a button element the same functionality
 *  as the HTML Native <option> element
 * @warning Three Conditions must be satisfied in order for this hook to work:
 *
 * 1:   It must be in a Component whose container is a focusable element
 *
 * 2:   It must be a direct sibling to another focusable element that contains this hook
 *
 * 3:   The list must contain only focusable elements
 *        - i.e. If you have a list of buttons and a loader at the end, wrap the list of options in a div.
 */

const useOption = (
  buttonRef: React.RefObject<HTMLButtonElement>,
  handleSelect: Function,
) => {
  useEffect(() => {
    const keyEvents$ = fromRefEvent(buttonRef, 'keydown')
      .pipe(
        pluck('key'),
        onlyKeys('Enter', 'Space', 'ArrowUp', 'Tab', 'ArrowDown'),
        tap(key => {
          const { current: buttonElement } = buttonRef
          if (!buttonElement) return

          if (key === 'Enter' || key === 'Space') handleSelect()
          if (key === 'ArrowUp') focusPreviousOption(buttonElement)
          if (key === 'Tab' || key === 'ArrowDown')
            focusNextOption(buttonElement)
        }),
      )
      .subscribe()

    return () => {
      keyEvents$.unsubscribe()
    }
  }, [buttonRef, handleSelect])

  const focusNextOption = (option: HTMLButtonElement) => {
    const nextOption = option.nextSibling as HTMLElement
    const listContainer = option.parentElement as HTMLElement
    const firstOption = listContainer.firstChild as HTMLElement
    if (nextOption) nextOption.focus()
    if (!nextOption) firstOption.focus()
  }

  const focusPreviousOption = (option: HTMLButtonElement) => {
    const previousOption = option.previousSibling as HTMLElement
    const listContainer = option.parentElement as HTMLElement
    const lastOption = listContainer.lastChild as HTMLElement
    if (previousOption) previousOption.focus()
    if (!previousOption) lastOption.focus()
  }
}

export default useOption
