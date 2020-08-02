import React from 'react'
import { useState, Children } from 'react'

type Props = {
  children: JSX.Element[]
  searchTerm: string
}
export const Search = ({ children, searchTerm }: Props) => {
  const { search } = useSearch(children)

  return <div>{search(children, searchTerm)}</div>
}

export const useSearch = (listChildren: JSX.Element[] | JSX.Element) => {
  const [searchedChildren, setSearchedChildren] = useState<
    JSX.Element[] | JSX.Element
  >(listChildren)

  const onSearch = (searchTerm: string) => {
    setSearchedChildren(() => search(listChildren, searchTerm))
  }

  const search = (children: JSX.Element[] | JSX.Element, searchTerm: string) =>
    Children.map(children, child => {
      const { props } = child
      if (childHasChildren(child)) {
        if (childrenHaveMatch(child.props.children, searchTerm)) return child
      }
      if (childHasChildren(child)) return
      if (propsHaveMatch(props, searchTerm)) return child
      return
    })

  const propsHaveMatch = (props: object, searchTerm: string): boolean =>
    Object.values(props).reduce((isMatch, prop): boolean => {
      if (typeof prop === 'object')
        return propsHaveMatch(prop, searchTerm) || isMatch
      if (typeof prop === 'string')
        return matchesSearch(prop, searchTerm) || isMatch

      if (typeof prop === ('number' || 'bool'))
        return matchesSearch(prop.toString(), searchTerm) || isMatch
      return isMatch
    }, false)

  type Children = string | JSX.Element | any[]
  const childrenHaveMatch = (
    children: Children,
    searchTerm: string,
  ): boolean => {
    if (typeof children === 'string') return matchesSearch(children, searchTerm)
    if (typeof children === 'object' && Array.isArray(children)) {
      return children
        .map(child => childrenHaveMatch(child, searchTerm))
        .reduce((bool, curr) => bool && curr, true)
    }

    return true
  }

  const childHasChildren = (child: JSX.Element) =>
    Children.count(child.props.children) > 0

  const matchesSearch = (optionLabel: string, searchTerm: string) =>
    optionLabel.toLowerCase().includes(searchTerm)

  return { searchedChildren, onSearch, search }
}
