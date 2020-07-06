import React, { createContext, useState, useEffect } from 'react'
import * as H from './helpers'
import { from, combineLatest } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { Command, System } from '../commands/models'
import { useObservable } from 'rxjs-hooks'
import { useFirestore, useFirestoreQuery } from '../shared/hooks'

const defaultContext = {
  commands: [],
  systems: [],
  currentSystem: 'Vscode',
  switchSystem: () => '',
}

type Context = {
  commands: any[]
  systems: System[]
  currentSystem: string
  switchSystem: (system: string) => void
}

export const CommandsContext = createContext<Context>(defaultContext)

export const CommandsProvider = ({ children }: any) => {
  const [currentSystem, setCurrentSystem] = useState('Vscode')

  const { list$: systems$ } = useFirestore<System>('systems')
  const { query$: commandQuery$ } = useFirestoreQuery<Command>('commands')

  const [systems, commands] = useObservable(
    () => {
      const commands$ = systems$.pipe(
        map(H.getSystemId(currentSystem)),
        switchMap(id =>
          commandQuery$({
            limit: 5,
            where: [['systemRef', '==', id]],
          }),
        ),
      )

      return combineLatest(systems$, commands$)
    },
    [[], []],
    [currentSystem],
  )

  const switchSystem = (system: string) => setCurrentSystem(system)

  return (
    <CommandsContext.Provider
      value={{
        commands,
        currentSystem,
        systems,
        switchSystem,
      }}>
      {children}
    </CommandsContext.Provider>
  )
}

export default CommandsProvider
