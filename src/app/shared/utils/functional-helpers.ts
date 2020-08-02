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

export const ifParam = (fn: Function) => (param: any) =>
  !!fn(param) ? fn(param) : param

export const maybePipe = (...fns: any[]) => (param: any) => {
  const maybes = fns.map(fn => ifParam(fn))
  // @ts-ignore
  return R.pipe(...maybes)(param)
}
