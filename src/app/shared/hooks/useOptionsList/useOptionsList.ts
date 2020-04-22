import pipe from 'lodash/fp/flow'
import React, { useEffect } from 'react'

import {
  focusPreviousChild,
  focusNextChild,
  getFocusedChildValue,
  addDefaultProps,
  addOnMouseEnterProp,
  fuzzySearchChildren,
  focusFirstChild,
  setSelections,
} from './useOptionsList.helpers'

import { Selection } from './useOptionsList.types'
import { useKeybind } from '../useKeybind'

const useSelectableList = (
  children: JSX.Element[],
  onSelect: Function,
  selections: Selection[] = [],
) => {
  const [newChildren, setNewChildren] = React.useState<JSX.Element[]>(
    focusFirstChild(addDefaultProps(onSelect, children)),
  )

  useEffect(() => {
    const setupInitialChildren = pipe(
      setSelections(selections),
      addOnMouseEnterProp(setNewChildren),
    )
    setNewChildren(setupInitialChildren)
  }, [])

  useKeybind('ArrowDown', () => setNewChildren(focusNextChild), true)
  useKeybind('Tab', () => setNewChildren(focusNextChild), true)
  useKeybind('ArrowUp', () => setNewChildren(focusPreviousChild), true)
  useKeybind('Enter', () => onSelect(getFocusedChildValue(newChildren)), true)

  const fuzzySearch = (term: string) => {
    setNewChildren(
      setSelections(
        selections,
        addDefaultProps(
          onSelect,
          focusFirstChild(fuzzySearchChildren(children, term)),
        ),
      ),
    )
  }

  return { newChildren, fuzzySearch }
}

export default useSelectableList
