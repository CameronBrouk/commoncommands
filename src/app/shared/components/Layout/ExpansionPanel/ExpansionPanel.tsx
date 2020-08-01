import React, { useState, Children } from 'react'
import { PanelContent } from './PanelContent'

type Props = { title: string }

export const ExpansionPanel: FC<Props> = ({ children, title }) => {
  return (
    <>
      <div className='max-w-screen-xl mx-auto sm:pt-2 px-4'>
        <div className='pb-2 border-b-2 border-gray-200 pt-3 pb-5 transition ease-in'>
          <PanelContent title={title}>{children}</PanelContent>
        </div>
      </div>
    </>
  )
}
