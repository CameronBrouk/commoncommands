import React, { createContext, useState } from 'react'
import { Command, System } from '../commands/models'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'
import { map, filter, switchMap, pluck } from 'rxjs/operators'
import { useFirestore } from '../shared/hooks'

const defaultContext = {
  commands: [],
  systems: [],
  currentSystem: 'Vscode',
  switchSystem: () => '',
}

type Context = {
  commands: Command[]
  systems: System[]
  currentSystem: string
  switchSystem: (system: string) => void
}

export const CommandsContext = createContext<Context>(defaultContext)

export const CommandsProvider = ({ children }: any) => {
  const [currentSystem, setCurrentSystem] = useState('Vscode')

  const { getList$: getSystems$ } = useFirestore<System>('systems')
  const { getList$: getCommands$ } = useFirestore<Command>('commands')

  const [systems, commands] = useObservable(
    () => combineLatest(getSystems$(), getCommands$()),
    [[], []],
  )

  const switchSystem = (system: string) => setCurrentSystem(system)

  return (
    <CommandsContext.Provider
      value={{
        currentSystem,
        systems,
        commands,
        switchSystem,
      }}>
      {children}
    </CommandsContext.Provider>
  )
}

export default CommandsProvider
