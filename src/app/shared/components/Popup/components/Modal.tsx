import React from 'react'

import { Props, Popup } from './Popup'
import { Mask } from './Mask'

/**
 * Extension of the Popover Component.  Includes an overlay/mask behind the Popover
 * @param isVisible boolean value representing whether the popup is visible
 * @param onClose function that sets the openState to false
 * @param children the components you want to display inside the popover
 */
export const Modal = (props: C<Props>) => {
  return (
    <>
      <Popup
        {...props}
        className={`w-full max-w-md m-auto flex-col ${props.className}`}
      />
      <Mask isShowing={props.isVisible} />
    </>
  )
}
