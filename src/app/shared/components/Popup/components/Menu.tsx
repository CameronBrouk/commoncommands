import React, { useEffect } from 'react'

import { useClickOutside } from '../useClickOutside'
import { setPosition } from '../helpers/popup.helpers'

import { useKeybind } from '../../../hooks/useKeybind'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export const Menu: FC<Props> = ({ isVisible, onClose, children }) => {
  const menuRef = useClickOutside(isVisible, onClose)
  useKeybind(['Escape'], onClose)

  return (
    <dialog
      aria-expanded={isVisible}
      open={isVisible}
      ref={menuRef}
      className='absolute w-full bg-white border border-t-0 border-gray-500 rounded-md focus-within:border-blue-300'>
      {children}
    </dialog>
  )
}
