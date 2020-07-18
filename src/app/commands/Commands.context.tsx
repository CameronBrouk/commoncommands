import React, { createContext, useState, useEffect } from 'react'
import * as H from './helpers'
import { from, combineLatest } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { Command, System } from '../commands/models'
import { useObservable } from 'rxjs-hooks'
import { useFirestore, useFirestoreQuery } from '../shared/hooks'

const defaultContext = {
  systems: [],
  currentSystem: 'Vscode',
  switchSystem: () => '',
}

type Context = {
  systems: System[]
  currentSystem: string
  switchSystem: (system: string) => void
}

export const CommandsContext = createContext<Context>(defaultContext)

export const CommandsProvider = ({ children }: any) => {
  const [currentSystem, setCurrentSystem] = useState('Vscode')

  const { list$: systems$ } = useFirestore<System>('systems')

  const [systems] = useObservable(
    () => {
      return combineLatest(systems$)
    },
    [[]],
    [currentSystem],
  )

  const switchSystem = (system: string) => setCurrentSystem(system)

  return (
    <CommandsContext.Provider
      value={{
        currentSystem,
        switchSystem,
        systems,
      }}>
      {children}
    </CommandsContext.Provider>
  )
}

export default CommandsProvider
