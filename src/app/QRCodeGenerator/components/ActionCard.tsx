import React from 'react'

type Props = {
  onClick?: () => void
  color: string
  abbreviation: string
  title: string
  description?: string
  selected?: boolean
}

export const ActionCard = ({ title, color, abbreviation, ...props }: Props) => (
  <li className={`flex col-span-1 cursor-pointer`} onClick={props.onClick}>
    <div
      className={`flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium leading-5 text-white rounded-l-md ${color}`}>
      {abbreviation}
    </div>
    <div
      className={`flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 hover:bg-green-200 ${
        props.selected && 'bg-green-200'
      } rounded-r-md`}>
      <div className='flex-1 px-4 py-5 text-sm leading-5 truncate'>
        <a
          href='#'
          className='font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-600'>
          {title}
        </a>
      </div>
    </div>
  </li>
)
