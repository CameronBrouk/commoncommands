import React from 'react'
import MaterialTable, { Column } from 'material-table'
import { useCommands } from '../../hooks'

import * as Model from '../../models'
import { useObservable } from 'rxjs-hooks'
import { map } from 'rxjs/operators'
import SystemForm from '../Forms/SystemForm'

interface Props {
  commands: Model.Command[]
  system: Model.System
}

const CommandsTable = (props: Props) => {
  const { updateCommand, deleteCommand, createCommand } = useCommands()

  const columns: Array<Column<Model.Command>> = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Category', field: 'category' },
  ]

  return (
    <MaterialTable
      title='Edit A Document'
      columns={columns}
      data={props.commands}
      editable={{
        onRowAdd: newData =>
          createCommand({
            name: newData.name,
            description: newData.description,
            systemRef: props.system.id,
          }),
        onRowUpdate: (newData, oldData) => updateCommand(newData.id, newData),
        onRowDelete: oldData => deleteCommand(oldData.id),
      }}
    />
  )
}

export default CommandsTable
