import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Icon, IconNames } from '../../icons/Icon'

type Props = {
  to: string
  iconName?: IconNames
  title: string
} & Partial<ButtonElement>

export const Link = ({ to, iconName, title }: Props) => {
  const background = iconName ? 'bg-gray-800' : 'bg-gray-100'

  // Show different styles based on whether an icon is given.
  //   NOTE:  this is basically 'sidebar icons' vs 'dropdown icons'
  const classes = iconName
    ? 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-800 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150'
    : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150'

  return (
    <RouterLink to={to} className={classes}>
      {iconName && <Icon iconName={iconName} />}
      {title}
    </RouterLink>
  )
}
