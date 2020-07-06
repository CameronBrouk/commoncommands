import React from 'react'

export const Mask: FC<{ isShowing: boolean }> = ({ isShowing }) => {
  const overlayClasses = isShowing ? 'opacity-100' : 'opacity-0'

  return (
    <>
      {isShowing && (
        <div
          className={`${overlayClasses} fixed inset-0 transition-opacity ease-linear duration-300 w-100`}>
          <div className={'absolute z-10 inset-0 bg-gray-600 opacity-75'}></div>
        </div>
      )}
    </>
  )
}
