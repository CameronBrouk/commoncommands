import * as R from 'ramda'
import * as T from '../functional-helpers'
import { SSL_OP_NO_TLSv1_2 } from 'constants'

const add1 = (n: number) => n + 1

const add = (n1: number, n2: number) => n1 + n2

const restAdd = (...n: number[]) => n.reduce((a, c) => a + c)

const curryAdd = (n1: number) => (n2: number) => n1 + n2
const curryAdd2 = (n1: number) => (n2: number) => (n3: number) => n1 + n2 + n3

test('should return value if param is included', () => {
  expect(T.maybe(add1, 2)).toEqual(3)
})

test('should return null if param is not included', () => {
  expect(T.maybe(add1)).toEqual(null)
})

test('should work with multiple params', () => {
  expect(T.maybe(add, 1, 2)).toEqual(3)
})

test('should work with curried params', () => {
  expect(T.maybe(curryAdd, 1, 3)).toEqual(4)
  expect(T.maybe(curryAdd2, 1, 3, 6)).toEqual(10)
  const add4 = T.maybe(curryAdd2, 1, 3)
  expect(add4(6)).toEqual(10)
})
