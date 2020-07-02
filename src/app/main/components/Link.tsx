import React, { useContext } from 'react'
import { IconNames } from './Icons/Icon'
import { CommandsContext } from 'app/commands/Commands.context'

type Props = {
  iconName?: IconNames
  title: string
} & Partial<ButtonElement>

export const Link = ({ iconName, title }: Props) => {
  const { switchSystem, currentSystem } = useContext(CommandsContext)

  // Show different styles based on whether an icon is given.
  //   NOTE:  this is basically 'sidebar icons' vs 'dropdown icons'
  const classes = iconName
    ? `group flex items-center leading-5 font-medium text-white bg-gray-800 w-4/5 focus:outline-none focus:bg-gray-700`
    : 'block bg-gray-100'

  const isSelected =
    currentSystem === title ? ' text-yellow-300 bg-indigo-200 rounded-md' : ' '

  return (
    <button
      className={`duration-150 transition ease-in-out text-sm px-2 mx-4 py-2 ${classes} ${isSelected}`}
      onClick={() => switchSystem(title)}>
      {title}
    </button>
  )
}
