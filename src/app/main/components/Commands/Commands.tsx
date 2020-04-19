import React, { useState } from 'react'

import * as Model from '../../models'

import { Styles } from '../../../../styles/classes'

import CommandsHeader from './CommandsHeader'
import {
  SearchableCommands,
  EditableCommands,
  CategorizedCommands,
} from './CommandsListViews'
import { Search } from '../Actions'

interface Props {
  commands: Model.Command[]
  system: Model.System
  className?: any
}

const Commands = ({ commands, system }: Props) => {
  const [view, setView] = useState<Model.views>('category')

  const { center, commandsTitle } = Styles()

  return (
    <section>
      <h1 className={commandsTitle}>{system.name} Commands</h1>

      <CommandsHeader setView={setView} />

      {view === 'category' && <CategorizedCommands commands={commands} />}
      {view === 'search' && <SearchableCommands commands={commands} />}
      {view === 'edit' && (
        <EditableCommands commands={commands} system={system} />
      )}
      <Search />
    </section>
  )
}

export default Commands
