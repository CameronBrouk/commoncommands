import curry from 'lodash/curry'
import { Children, cloneElement } from 'react'

import {
  OptionProps,
  Selection,
  OptionComponent,
  setSelectionsFunction,
} from './useOptionsList.types'

export const matchesSearch = (optionLabel: string, searchTerm: string) =>
  optionLabel.toLowerCase().includes(searchTerm)

const setFocusedAtIndex = (children: OptionComponent[], childIndex: number) =>
  Children.map(children, child =>
    child.props.index === childIndex
      ? cloneElement(child, { isFocused: true })
      : child,
  )

export const currySetSelections = (
  options: Selection[],
  children: OptionComponent[],
) =>
  Children.map(children, child => {
    const isSelected = options
      .map(option => option.label)
      .reduce((boolean, label) => child.props.label === label || boolean, false)
    return isSelected ? cloneElement(child, { isSelected: true }) : child
  })
export const setSelections = curry(currySetSelections)

const resetFocus = (children: OptionComponent[]) => {
  let isFocusedIndex = -1
  const newChildren = Children.map(children, (child, index) => {
    if (child.props.isFocused) {
      isFocusedIndex = index
    }

    return cloneElement(child, { isFocused: false })
  })

  return { newChildren, isFocusedIndex }
}

const resetChildren = (children: OptionComponent[]) =>
  Children.map(children, (child, index) =>
    cloneElement(child, { isFocused: false, index: index }),
  )

export const focusNextChild = (children: OptionComponent[]) => {
  const { newChildren, isFocusedIndex } = resetFocus(children)
  return setFocusedAtIndex(newChildren, isFocusedIndex + 1)
}

export const focusPreviousChild = (children: OptionComponent[]) => {
  const { newChildren, isFocusedIndex } = resetFocus(children)
  return setFocusedAtIndex(newChildren, isFocusedIndex - 1)
}

export const focusFirstChild = (children: OptionComponent[]) => {
  const { newChildren } = resetFocus(children)
  return setFocusedAtIndex(newChildren, 0)
}

export const focusLastChild = (children: OptionComponent[]) => {
  const lastChildIndex = Children.count(children) - 1
  const { newChildren } = resetFocus(children)
  return setFocusedAtIndex(newChildren, lastChildIndex)
}

export const focusChildAtIndex = (
  children: OptionComponent[],
  childIndex: number,
) => setFocusedAtIndex(resetChildren(children), childIndex)

export const getFocusedChildValue = (children: OptionComponent[]) => {
  let focusChildProps = {}
  Children.forEach(children, child => {
    if (!child.props.isFocused) return
    focusChildProps = { value: child.props.value, label: child.props.label }
  })
  return focusChildProps
}

const curryAddDefaultProps = (onSelect: Function, children: JSX.Element[]) =>
  Children.map(children, (child, index) =>
    cloneElement(child, {
      isFocused: child.props.isFocused || false,
      isSelected: child.props.isSelected || false,
      isDisabled: child.props.isDisabled || false,
      index: index,
      onSelect: () =>
        child.props.isDisabled
          ? null
          : onSelect({ label: child.props.label, value: child.props.value }),
    }),
  )
export const addDefaultProps = curry(curryAddDefaultProps)

export const addOnMouseEnterProp = (setChildren: setSelectionsFunction) => (
  children: OptionComponent[],
) =>
  Children.map(resetChildren(children), child =>
    cloneElement(child, {
      onMouseEnter: () => setChildren(resetChildren(children)),
    }),
  )

const curryFuzzySearchChildren = (
  children: OptionComponent[],
  searchTerm: string,
) =>
  resetChildren(
    Children.map(children, child => {
      if (!matchesSearch(child.props.label, searchTerm)) return
      return child
    }),
  )
export const fuzzySearchChildren = curry(curryFuzzySearchChildren)
