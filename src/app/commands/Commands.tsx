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

  const { query: commandsQuery } = useFirestoreQuery<Command>('commands')

  useEffect(() => {
    const systemId = getSystemId(currentSystem)(systems)
    if (systemId) {
      commandsQuery({
        where: [['systemRef', '==', systemId]],
        limit: 10,
      }).then(setCommands)
    }
  }, [currentSystem, systems])

  return (
    <div>
      {searchTerm === '' ? (
        Object.entries(sortCommandsByCategory(commands)).map(
          ([category, commands]) => (
            <ExpansionPanel title={category} key={category}>
              <CommandsTable commands={commands} />
            </ExpansionPanel>
          ),
        )
      ) : (
        <CommandsTable commands={fuzzySearch(commands, searchTerm)} />
      )}
    </div>
  )
}

const CommandsTable = ({ commands }: { commands: Command[] }) => {
  if (commands.length === 0) return <p className='ml-10'>No Results</p>
  return (
    <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
      <table className='min-w-full divide-y divide-gray-200'></table>
      <thead className='min-w-full bg-gray-50'>
        <tr>
          <th
            scope='col'
            className='w-1/2 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
            Command
          </th>
          <th
            scope='col'
            className='w-1/2 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
            Description
          </th>
          <th scope='col' className='relative px-6 py-3'>
            <span className='sr-only'>Edit</span>
          </th>
        </tr>
      </thead>
      {commands.map((command, index) => (
        <CommandListItem command={command} key={command.id} index={index} />
      ))}
    </div>
  )
}

const CommandListItem = ({
  command,
  index,
}: {
  command: Command
  index: number
}) => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <tbody>
      <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
        <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
          {command.name}
        </td>
        <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
          {command.description}
        </td>
        <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
          <a href='#' className='text-indigo-600 hover:text-indigo-900'>
            Edit
          </a>
        </td>
      </tr>
    </tbody>
  )
}
