import React from 'react'

import { Props, Popup } from './Popup'
import { Mask } from './Mask'

/**
 * Extension of the Popover Component.  Includes an overlay/mask behind the Popover
 * @param isVisible boolean value representing whether the popup is visible
 * @param onClose function that sets the openState to false
 * @param children the components you want to display inside the popover
 */
export const Modal: FC<Props> = props => {
  return (
    <>
      <Popup {...props} />
      <Mask isShowing={props.isVisible} />
    </>
  )
}
