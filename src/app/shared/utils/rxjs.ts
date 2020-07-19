import { isNil } from './common-functions'
import {
  fromEvent,
  of,
  iif,
  Observable,
  empty,
  pipe,
  MonoTypeOperatorFunction,
} from 'rxjs'
import {
  map,
  tap,
  pluck,
  switchMap,
  filter,
  mapTo,
  take,
  scan,
  reduce,
  finalize,
} from 'rxjs/operators'
import { RefObject } from 'react'

export const fromRefEvent = (ref: RefObject<HTMLElement>, event: string) =>
  of().pipe(
    mapTo(ref.current),
    switchMap(element => (element ? fromEvent(element, event) : empty())),
    filterNil(),
  )

// Operators
export const filterNil = <T>() =>
  filter<T>(value => value !== undefined && value !== null)

// const b = [
//   test: 'test',
// ]
// const a = (a: typeof b | null) =>
//   of(a).pipe(
//     // filterNil(isNil),
//     mapArray(a => ),
//   )

// let mapArray: <T extends any[]>(
//   source: Observable<T>,
// ) => <F extends Function>(fn: F) => Observable<T>

// export const mapArray = <T extends array[]>(srouce: Observable<T>)

// let mapArray: (array: T, fn: K) => ReturnType<K>
// let mapArray: <T extends any[]>(
//   array: T,
// ) => <T extends any[]>(fn: Fn) => MonoTypeOperatorFunction<T>

// const mapArray = array => fn => map(array => array.map(fn))

export const log = (tag = 'DEBUG') =>
  tap({
    next(value) {
      console.log(
        `%c[${tag}: Next]`,
        'background: #009688; color: #fff; padding: 3px; font-size: 9px;',
        value,
      )
    },
    error(error) {
      console.log(
        `%[${tag}: Error]`,
        'background: #E91E63; color: #fff; padding: 3px; font-size: 9px;',
        error,
      )
    },
    complete() {
      console.log(
        `%c[${tag}]: Complete`,
        'background: #00BCD4; color: #fff; padding: 3px; font-size: 9px;',
      )
    },
  })

export const onlyKeys = (...keys: string[]) =>
  filter((key: string) => keys.includes(key))

export const hotkeyEvent = (...keys: string[]) =>
  pipe(
    filter((key: string) => keys.includes(key)),
    scan((allEvents: string[], event: string) => [...allEvents, event], []),
    filter(keyEvents => keyEvents.length >= keys.length),
    map(keyEvents => keyEvents.slice(-keys.length)),
    filter(keyEvents =>
      keyEvents.reduce((allMatch: boolean, key, index) => {
        const isMatch = keys[index] === key
        return isMatch && allMatch
      }, true),
    ),
  )
