import React from 'react'

import { Props, Popup } from './Popup'
import { Mask } from './Mask'

export const Modal: FC<Props> = props => {
  return (
    <>
      <Popup {...props} />
      <Mask isShowing={props.isVisible} />
    </>
  )
}
