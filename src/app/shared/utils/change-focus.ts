import { RefObject } from 'react'

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

export const focusNextElementInList = (ref: RefObject<HTMLElement>) => {
  const { nextSibling, firstElementInList } = getSiblingsFromRef(ref)
  if (nextSibling) nextSibling.focus()
  if (!nextSibling) firstElementInList.focus()
}

export const focusPreviousElementInList = (ref: RefObject<HTMLElement>) => {
  const { nextSibling, firstElementInList } = getSiblingsFromRef(ref)
  if (nextSibling) nextSibling.focus()
  if (!nextSibling) firstElementInList.focus()
}

export const focusNextElement = (ref: RefObject<HTMLElement>) => {
  const { nextSibling } = getSiblingsFromRef(ref)
  if (nextSibling) nextSibling.focus()
}

export const focusPreviousElement = (ref: RefObject<HTMLElement>) => {
  const { previousSibling } = getSiblingsFromRef(ref)
  if (previousSibling) previousSibling.focus()
}

/**
 * focuses the given element.
 * @param ref useRef object OR an html element ID
 */
export const focusElement = (ref: RefObject<HTMLElement> | string) => {
  if (typeof ref === 'string') document.getElementById(ref)?.focus()
  else {
    ref.current?.focus()
  }
}
