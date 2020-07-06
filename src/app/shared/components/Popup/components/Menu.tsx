import React, { useEffect } from 'react'

import { useClickOutside } from '../useClickOutside'
import { setPosition } from '../../../utils/viewport'

import { useKeybind } from '../../../hooks/useKeybind'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export const Menu: FC<Props> = ({ isVisible, onClose, children }) => {
  const menuRef = useClickOutside(isVisible, onClose)

  useEffect(() => {
    const divElement = menuRef?.current
    if (divElement) setPosition(divElement)
  })

  useKeybind(['Escape'], onClose)

  return (
    <>
      {isVisible && (
        <dialog
          aria-expanded={isVisible}
          open={isVisible}
          ref={menuRef}
          className='absolute w-100 bg-white rounded-md border border-gray-200'>
          {children}
        </dialog>
      )}
    </>
  )
}
