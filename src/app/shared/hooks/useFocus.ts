import { RefObject } from 'react'

/**
 * This hook takes a ref as a parameter and exposes a set of focus related functions
 * @param ref useRef<HTMLElement> object
 */
export const useFocus = (ref: RefObject<HTMLElement>) => {
  // React's RefObject types do not expose the normal HTML Element
  // functions (such as .focus()) after calling the nextSibling or previousSibling.
  // I believe this is an oversight(the .focus() function works).
  // In order to prevent a ts error, I cast it as an HTMLElement
  const getSiblingsFromRef = (ref: RefObject<HTMLElement>) => {
    const nextSibling = ref.current?.nextSibling as HTMLElement
    const previousSibling = ref.current?.previousSibling as HTMLElement
    const listContainer = ref.current?.parentElement as HTMLElement
    const firstElementInList = listContainer.firstChild as HTMLElement
    const lastElementInList = listContainer.lastChild as HTMLElement

    return {
      nextSibling,
      listContainer,
      firstElementInList,
      lastElementInList,
      previousSibling,
    }
  }

  const focusNextElementInList = () => {
    const { nextSibling, firstElementInList } = getSiblingsFromRef(ref)
    if (nextSibling) nextSibling.focus()
    if (!nextSibling) firstElementInList.focus()
  }

  const focusPreviousElementInList = () => {
    const { nextSibling, firstElementInList } = getSiblingsFromRef(ref)
    if (nextSibling) nextSibling.focus()
    if (!nextSibling) firstElementInList.focus()
  }

  const focusNextElement = () => {
    const { nextSibling } = getSiblingsFromRef(ref)
    if (nextSibling) nextSibling.focus()
  }

  const focusPreviousElement = () => {
    const { previousSibling } = getSiblingsFromRef(ref)
    if (previousSibling) previousSibling.focus()
  }

  return {
    focusNextElement,
    focusPreviousElement,
    focusNextElementInList,
    focusPreviousElementInList,
  }
}
