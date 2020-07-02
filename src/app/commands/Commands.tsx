import React, { useContext } from 'react'
import { CommandsContext } from './Commands.context'
import { Searchable } from './components'

import { filterCommandsBySystem } from './helpers'

export const Commands = () => {
  const { commands, currentSystem, systems } = useContext(CommandsContext)

  const system = systems.filter(({ name }) => currentSystem === name)[0]
  // const categorizedCommands = H.sortCommandByCategory(commands)
  // console.log(categorizedCommands)

  return (
    <div className='text-l'>
      <Searchable commands={filterCommandsBySystem(commands, system)} />
    </div>
  )
}
