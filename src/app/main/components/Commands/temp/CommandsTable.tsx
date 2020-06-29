import React from 'react'
import MaterialTable, { Column } from 'material-table'

import { useFirestore } from '../../../../shared/hooks'
import * as Model from '../../../models'

interface Props {
  commands: Required<Model.Command>[]
  system: Model.System
}

const CommandsTable = (props: Props) => {
  const {
    update: updateCommand,
    remove: deleteCommand,
    create: createCommand,
  } = useFirestore<Model.Command>('commands')

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
            category: newData.category,
          }),
        onRowUpdate: (newData, oldData) => updateCommand(newData.id, newData),
        onRowDelete: oldData => deleteCommand(oldData.id),
      }}
    />
  )
}

export default CommandsTable
