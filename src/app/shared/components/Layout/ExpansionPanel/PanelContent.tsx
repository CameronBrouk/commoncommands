import React, { useState } from 'react'

type Props = { title: string }

export const PanelContent: FC<Props> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false)

  const svgClasses = isOpen ? 'rotate-180' : 'rotate-0'

  const toggleOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <dl>
      <dt className='text-lg leading-7'>
        {/* <!-- Expand/collapse question button --> */}
        <div className='text-left w-full flex justify-between items-start text-gray-400 focus:outline-none focus:text-gray-900'>
          <button className='font-medium text-gray-900' onClick={toggleOpen}>
            {title}
          </button>
          <span className='ml-6 h-7 flex items-center'>
            <button onClick={() => setIsOpen(visible => !visible)}>
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
            </button>
          </span>
        </div>
      </dt>
      {isOpen && <dd className='mt-2 pr-12'>{children}</dd>}
    </dl>
  )
}
