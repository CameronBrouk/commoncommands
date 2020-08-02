import React, { useContext, useEffect, useState } from 'react'
import { useFirestoreQuery } from '../shared/hooks'
import { CommandsContext } from './Commands.context'

import { getSystemId, sortCommandsByCategory } from './helpers'
import { Command } from './models'
import { ExpansionPanel, Modal } from 'app/shared/components'
import { fuzzySearch } from 'app/shared/utils/fuzzy-search'

export const Commands = ({ searchTerm }: { searchTerm: string }) => {
  const [commands, setCommands] = useState<any[]>([])
  const { currentSystem, systems } = useContext(CommandsContext)

  const { query$: commandsQuery$ } = useFirestoreQuery<Command>('commands')

  useEffect(() => {
    const systemId = getSystemId(currentSystem)(systems)
    if (systemId) {
      commandsQuery$({
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
              {commands.map(command => (
                <CommandListItem command={command} key={command.id} />
              ))}
            </ExpansionPanel>
          ),
        )}

      {searchTerm.length > 0 &&
        fuzzySearch(commands, searchTerm).map(command => (
          <CommandListItem command={command} key={command.id} />
        ))}
    </div>
  )
}

const CommandListItem = ({ command }: { command: Command }) => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className='flex p-4 md:m-1 bg-white border-b text-xs' key={command.id}>
      <span className='md:w-64 font-bold pl-1 pr-5'>{command.name}</span>
      <span className='text-left'>{command.description}</span>
      <span className='flex-grow' />

      <button
        className='text-indigo-600 hover:text-indigo-900 text-right relative'
        onClick={() => setFormOpen(true)}>
        Edit
      </button>

      <Modal onClose={() => setFormOpen(false)} isVisible={formOpen}>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
      </Modal>
    </div>
  )
}
