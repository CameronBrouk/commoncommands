import React from 'react'
import { HomeIcon } from './HomeIcon'
import { PeopleIcon } from './PeopleIcon'
import { FolderIcon } from './FolderIcon'
import { CalendarIcon } from './CalendarIcon'
import { DocumentIcon } from './DocumentIcon'
import { ReportsIcon } from './ReportsIcon'

export type IconNames =
  | 'home'
  | 'people'
  | 'folder'
  | 'calendar'
  | 'reports'
  | 'document'
  | 'bell'

type Props = {
  iconName: IconNames
}

export const Icon = ({ iconName }: Props) => {
  return (
    <>
      {iconName === 'home' && <HomeIcon />}
      {iconName === 'people' && <PeopleIcon />}
      {iconName === 'folder' && <FolderIcon />}
      {iconName === 'calendar' && <CalendarIcon />}
      {iconName === 'reports' && <ReportsIcon />}
      {iconName === 'document' && <DocumentIcon />}
    </>
  )
}
