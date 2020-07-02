import React, { useContext } from 'react'
import { CommandsContext } from '../../../commands/Commands.context'
import { Link } from '../Link'

export const Nav = () => {
  const { systems } = useContext(CommandsContext)

  return (
    <nav className='mt-5 flex-1 px-2 bg-gray-800'>
      {systems.map(system => (
        <Link iconName='home' title={system.name} key={system.id} />
      ))}
    </nav>
  )
}
