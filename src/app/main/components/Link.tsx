import React, { useContext } from 'react'
import { Icon, IconNames } from './Icons/Icon'
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
    ? `group flex items-center leading-5 font-medium text-white bg-gray-800 focus:outline-none focus:bg-gray-700`
    : 'block bg-gray-100'

  const isSelected = currentSystem === title ? 'border-b border-white' : ''

  return (
    <button
      className={`duration-150 transition ease-in-out text-sm px-4 py-2 ${classes} ${isSelected}`}
      onClick={() => switchSystem(title)}>
      {/* {iconName && <Icon iconName={iconName} />} */}
      {title}
    </button>
  )
}
