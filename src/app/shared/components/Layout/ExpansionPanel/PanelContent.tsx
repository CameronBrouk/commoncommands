import React, { useState } from 'react'

type Props = { title: string }

export const PanelContent: FC<Props> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false)

  const svgClasses = isOpen ? 'rotate-180' : 'rotate-0'

  const toggleOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <dl>
      <dt className='leading-7'>
        <button
          onClick={toggleOpen}
          className='flex items-start justify-between w-full p-2 text-left text-gray-400 transition-all duration-500 cursor-pointer focus:outline-none focus:text-gray-900 hover:bg-gray-200'>
          <h2 className='font-medium text-gray-900'>{title}</h2>
          <span className='flex items-center ml-6 h-7'>
            <div>
              <svg
                className={`${svgClasses} h-6 w-6 transform`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </span>
        </button>
      </dt>
      {isOpen && <dd className='flex-auto mt-3'>{children}</dd>}
    </dl>
  )
}
