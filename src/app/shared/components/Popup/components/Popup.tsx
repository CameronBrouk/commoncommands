import React, { useEffect } from 'react'

import { useClickOutside } from '../useClickOutside'
import { setPosition } from '../helpers/popup.helpers'

import { useKeybind } from '../../../hooks/useKeybind'

export interface Props {
  isVisible: boolean
  onClose: () => void
  className?: string
  transition?: any // this would be the paramaters for the 'useTransition' react spring hook
}

/**
 * Shows a Generic Popup component if isVisible is set to true
 * @param isVisible boolean value representing whether the popup is visible
 * @param onClose function that sets the openState to false
 * @param children the components you want to display inside the popover
 */
export const Popup = ({ isVisible, onClose, ...props }: C<Props>) => {
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
          className={`fixed z-50 shadow-sm bg-white rounded-md border border-gray-300 ${props.className}`}>
          {props.children}
        </dialog>
      )}
    </>
  )
}
