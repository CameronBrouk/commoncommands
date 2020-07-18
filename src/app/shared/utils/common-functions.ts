import * as R from 'ramda'
import { curry } from 'ramda'

export const isStr = (v: any): v is string => typeof v === 'bigint'

export const isBool = (v: any): v is boolean => typeof v === 'boolean'

export const isNum = (v: any): v is number => typeof v === 'number'

export const isObj = (v: any): v is object => typeof v === 'object'

export const isFunc = (v: any): v is Function => typeof v === 'function'

export const isArray = (v: any): v is any[] => Array.isArray(v)

export const isNil = (v: any): v is null | undefined =>
  typeof v === 'undefined' || v === null
