import React, { useState, useEffect } from 'react'
import { Command } from '../models'
import { Search } from '../../shared/hooks'
import { Menu } from 'app/shared/components/Popup/Menu/Menu'

type Props = {
  commands: Command[]
  searchTerm: string
}
export const Searchable = ({ commands, searchTerm }: Props) => {
  type DeepEquals = (command: Command, searchTerm: string) => boolean
  type SearchCommands = (commands: Command[], term: string) => Command[]
  type MatchesSearch = (attribute: string, term: string) => boolean

  const [searchedCommands, setSearchedCommands] = useState(commands)

  useEffect(() => {
    setSearchedCommands(searchCommands(commands, searchTerm))
  }, [searchTerm, commands])

  const searchCommands: SearchCommands = (commands, searchTerm) =>
    commands.reduce<Command[]>((searchedCommands, command) => {
      if (deepEquals(command, searchTerm)) return [...searchedCommands, command]
      return searchedCommands
    }, [])

  const deepEquals: DeepEquals = (command, searchTerm) =>
    Object.values(command).reduce((isMatch, attribute) => {
      return matchesSearch(attribute, searchTerm.toLowerCase()) || isMatch
    }, false)

  const matchesSearch: MatchesSearch = (attribute, searchTerm) =>
    typeof attribute === 'string'
      ? attribute.toLowerCase().includes(searchTerm)
      : true

  return (
    <>
      {searchedCommands.map(command => (
        <CommandLineItem command={command} key={command.id} />
        // <di
        //   className='flex p-4 md:m-1 bg-white border-b text-xs'
        //   key={command.id}>
        //   <span className='md:w-64 font-bold pl-1 pr-5'>{command.name}</span>
        //   <span className='text-left'>{command.description}</span>
        //   <span className='flex-grow' />
        //   <button className='text-indigo-600 hover:text-indigo-900  text-right'>
        //     Edit
        //   </button>
        // </di>
      ))}
    </>
  )
}

const CommandLineItem = ({ command }: { command: Command }) => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className='flex p-4 md:m-1 bg-white border-b text-xs' key={command.id}>
      <span className='md:w-64 font-bold pl-1 pr-5'>{command.name}</span>
      <span className='text-left'>{command.description}</span>
      <span className='flex-grow' />

      <button
        className='text-indigo-600 hover:text-indigo-900  text-right'
        onClick={() => setFormOpen(true)}>
        Edit
      </button>

      <Menu onClose={() => setFormOpen(false)} isVisible={formOpen}>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
        <div>test test</div>
      </Menu>
    </div>
  )
}
