import React, { useContext, useEffect, useState } from 'react'
import { useObservable } from 'rxjs-hooks'
import { useFirestoreQuery } from '../shared/hooks'
import { CommandsContext } from './Commands.context'
import { Searchable } from './components'

import {
  filterCommandsBySystem,
  getSystemId,
  getSystemByName,
  sortCommandsByCategory,
} from './helpers'
import { System, Command } from './models'
import { ExpansionPanel } from 'app/shared/components/Layout/ExpansionPanel/ExpansionPanel'

type Props = {
  searchTerm: string
}
export const Commands = ({ searchTerm }: Props) => {
  const [commands, setCommands] = useState<any[]>([])
  const { currentSystem, systems } = useContext(CommandsContext)

  const { query$: commandsQuery$ } = useFirestoreQuery<Command>('commands')

  useEffect(() => {
    const systemId = getSystemId(currentSystem)(systems)
    if (systemId) {
      commandsQuery$({
        limit: 2,
        where: [['systemRef', '==', systemId]],
      }).subscribe(setCommands)
    }
  }, [currentSystem, systems])

  return (
    <div>
      {searchTerm === '' &&
        Object.entries(sortCommandsByCategory(commands)).map(
          ([category, commands]) => (
            <ExpansionPanel title={category} key={category}>
              <Searchable commands={commands} searchTerm={searchTerm} />
            </ExpansionPanel>
          ),
        )}

      {searchTerm.length > 0 && (
        <Searchable commands={commands} searchTerm={searchTerm} />
      )}
    </div>
  )
}
