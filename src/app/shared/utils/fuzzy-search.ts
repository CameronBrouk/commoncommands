import * as R from 'ramda'

/**
 * Filters all elements in an array that match a given substring.
 * @param array an array of random attributes.  can be object/string/number/etc
 * @param searchTerm a string or substring
 */
export const fuzzySearch = (array: any[], searchTerm: string) =>
  array.reduce<any[]>((searchedElements, element) => {
    const is = R.is(R.__, element) as any

    if (is(Object) && searchObject(element, searchTerm))
      return [...searchedElements, element]

    if (is(String) || is(Number) || is(Boolean)) {
      if (searchElement(element, searchTerm))
        return [...searchedElements, element]
    }

    return searchedElements
  }, [])

/**
 *  compares every attribute of an object to a string.
 *  If any attributes match the string, the function returns true.
 *  If the attribute is an object, this function is run recursively.
 * @param object any type of object
 * @param searchTerm whatever substring you are wanting to search
 */
export const searchObject = (object: object, searchTerm: string): boolean =>
  Object.values(object).reduce((isMatch, attribute) => {
    // If any attribute in the object has matched, return true
    if (isMatch) return true

    const is = R.is(R.__, attribute) as any

    // If the attribute is an object, recurse
    if (is(Object)) return searchObject(attribute, searchTerm)

    // if the attribute is a string/bool/num, check if it matches
    if (is(Number) || is(Boolean) || is(String))
      return searchElement(attribute, searchTerm)

    // If it's anything else, ignore it
    return isMatch
  }, false)

type Element = string | number | boolean
const searchElement = (element: Element, searchTerm: string) =>
  sanitize(element).includes(sanitize(searchTerm))

const sanitize = (element: Element) => element.toString().toLowerCase()
