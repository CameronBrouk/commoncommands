import React, { createContext } from 'react'
import { Command, System } from '../commands/models'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'
import { map, filter, switchMap, pluck } from 'rxjs/operators'
import { useFirestore } from '../shared/hooks'

const defaultContext = {
  commands: [],
  systems: [],
}

type Context = {
  commands: Command[]
  systems: System[]
}

export const CommandsContext = createContext<Context>(defaultContext)

export const CommandsProvider = ({ children }: any) => {
  const { getList$: getSystems$ } = useFirestore<System>('systems')
  const { getList$: getCommands$ } = useFirestore<Command>('commands')

  const [systems, commands] = useObservable(
    () => combineLatest(getSystems$(), getCommands$()),
    [[], []],
  )

  return (
    <CommandsContext.Provider
      value={{
        systems,
        commands,
      }}>
      {children}
    </CommandsContext.Provider>
  )
}

export default CommandsProvider
