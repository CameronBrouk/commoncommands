import React, { useContext } from 'react'
import { IconNames } from '../shared/components/Icons/Icon'

type Props = {
  iconName?: IconNames
  title: string
} & Partial<ButtonElement>

export const Link = ({ iconName, title }: Props) => {
  const currentRoute = 'route'

  // Show different styles based on whether an icon is given.
  //   NOTE:  this is basically 'sidebar icons' vs 'dropdown icons'
  const classes = iconName
    ? `group flex items-center leading-5 font-medium text-white bg-gray-800 w-4/5 focus:outline-none rounded-md focus:bg-gray-500 focus:text-white`
    : 'block bg-gray-100'

  const isSelected = currentRoute === title ? 'bg-indigo-700 text-white' : ' '

  return (
    <button
      className={`duration-150 transition ease-in-out text-sm px-2 mx-4 py-2 ${classes} ${isSelected}`}
      // onClick={() => switchSystem(title)}
    >
      {title}
    </button>
  )
}
