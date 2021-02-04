import React, { useState, Children } from 'react'
import { PanelContent } from './PanelContent'

type Props = { title: string }

export const ExpansionPanel: FC<Props> = ({ children, title }) => {
  return (
    <>
      <div className='max-w-screen-xl mx-auto border border-gray-200'>
        <PanelContent title={title}>{children}</PanelContent>
      </div>
    </>
  )
}
