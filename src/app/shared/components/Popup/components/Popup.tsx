import React, { useEffect } from 'react'

import { useClickOutside } from '../useClickOutside'
import { setPosition } from '../helpers/popup.helpers'
import { useTransition } from 'react-spring'

import { useKeybind } from '../../../hooks/useKeybind'

export interface Props {
  isVisible: boolean
  onClose: () => void
  className?: string
  transition?: any // this would be the paramaters for the 'useTransition' react spring hook
}

export const Popup: FC<Props> = ({ isVisible, onClose, ...props }) => {
  const ref = useClickOutside(isVisible, onClose)

  useEffect(() => {
    const divElement = ref?.current
    if (divElement) setPosition(divElement)
  })

  useKeybind(['Escape'], onClose)

  return (
    <>
      {isVisible && (
        <dialog
          aria-expanded={isVisible}
          open={isVisible}
          ref={ref}
          className={`absolute z-50 shadow-sm bg-white rounded-md border border-gray-300 ${props.className}`}>
          {props.children}
        </dialog>
      )}
    </>
  )
}
