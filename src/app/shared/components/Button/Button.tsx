import React from 'react'

type Props = {
  variant?: 'raised' | 'warn'
  children: React.ReactNode
} & ButtonElement
export const Button = ({ variant, children, className, ...props }: Props) => {
  const base = !variant
    ? 'px-2 py-1 text-gray-500 font-medium focused:bg-gray-100 hover:bg-gray-100 rounded'
    : ''

  const raised =
    variant === 'raised'
      ? 'px-4 py-2 font-bold text-white bg-blue-500 rounded'
      : ''

  const warn =
    variant === 'raised'
      ? 'px-4 py-2 font-bold text-white bg-red-500 rounded'
      : ''

  return (
    <button
      className={`${className || ''} ${base} ${raised} ${warn}`}
      {...props}>
      {children}
    </button>
  )
}
