import React from 'react'
import { Command } from '../models'

type Props = {
  commands: Command[]
}
export const Searchable = ({ commands }: Props) => {
  return (
    <div>
      {commands.map(command => (
        <div className='flex p-4 md:m-1 bg-white border-b text-xs'>
          <span className='md:w-64 font-bold pl-1 pr-5'>{command.name}</span>
          <span className='text-left'>{command.description}</span>
          <span className='flex-grow' />
          <button className='text-indigo-600 hover:text-indigo-900  text-right'>
            Edit
          </button>
        </div>
      ))}
    </div>
  )
}
