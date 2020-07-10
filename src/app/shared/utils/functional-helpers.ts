import * as R from 'ramda'
// This file contains container / helper functions for functional programming
// This is similar to what Ramda has, but includes things that they do not

export const maybe = <T extends Function, K>(
  fn: T,
  ...params: K[]
): ThisType<K> | null => {
  if (!params[0]) return null
  const curriedFn = R.curry(fn as any)
  return params.reduce<T>((fn, param) => {
    return fn(param)
  }, curriedFn as any)
}
