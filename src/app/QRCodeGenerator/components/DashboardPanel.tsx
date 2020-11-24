import React from 'react'

type Props = {
  title: string
  value: number
}

export const DashboardPanel = ({ title, value }: Props) => (
  <div className='overflow-hidden bg-white rounded-lg shadow'>
    <div className='p-5'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          {/* <!-- Heroicon name: scale --> */}
          <svg
            className='w-6 h-6 text-cool-gray-400'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
            />
          </svg>
        </div>
        <div className='flex-1 w-0 ml-5'>
          <dl>
            <dt className='text-sm font-medium leading-5 truncate text-cool-gray-500'>
              {title}
              {/* Total Impressions */}
            </dt>
            <dd>
              <div className='text-lg font-medium leading-7 text-cool-gray-900'>
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
)
