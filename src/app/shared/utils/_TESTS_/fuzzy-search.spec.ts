import * as T from '../fuzzy-search'

test('should return matched strings', () => {
  const array = ['hello', 'world']
  expect(T.fuzzySearch(array, 'he')).toEqual(['hello'])
  expect(T.fuzzySearch(array, 'rld')).toEqual(['world'])
  expect(T.fuzzySearch(array, 'o')).toEqual(['hello', 'world'])
})

test('should return matched numbers and booleans', () => {
  const array = [7, true]
  expect(T.fuzzySearch(array, '7')).toEqual([7])
  expect(T.fuzzySearch(array, 'tr')).toEqual([true])
})

test('should return matched objects', () => {
  const array = [
    { a: 'hello', b: 'world' },
    { a: 'zip', b: 'rot' },
  ]
  expect(T.fuzzySearch(array, 'z')).toEqual([array[1]])
  expect(T.fuzzySearch(array, 'he')).toEqual([array[0]])
  expect(T.fuzzySearch(array, 'W')).toEqual([array[0]])
})

test('should return matches from recursive objects', () => {
  const array = [
    {
      a: 'a',
      b: {
        c: 'c',
        d: 'd',
      },
    },
    {
      a: 'a',
      b: 'b',
      c: {
        z: 7,
      },
    },
    {
      a: {
        r: true,
      },
    },
  ]

  expect(T.fuzzySearch(array, 'd')).toEqual([array[0]])
  expect(T.fuzzySearch(array, '7')).toEqual([array[1]])
  expect(T.fuzzySearch(array, 'tru')).toEqual([array[2]])
})
