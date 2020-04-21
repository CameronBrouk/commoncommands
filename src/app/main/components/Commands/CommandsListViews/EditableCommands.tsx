import React from 'react'
import MaterialTable, { Column } from 'material-table'
import { useCommands } from '../../../hooks'

import * as Model from '../../../models'

interface Props {
  commands: Model.Command[]
  system: Model.System
}

const EditableCommands = (props: Props) => {
  const { updateCommand, deleteCommand, createCommand } = useCommands()

  const columns: Array<Column<Model.Command>> = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Category', field: 'category' },
  ]

  return (
    <MaterialTable
      title={'Edit ' + props.system.name + ' Commands'}
      columns={columns}
      data={props.commands}
      editable={{
        onRowAdd: newData =>
          createCommand({
            ...newData,
            systemRef: props.system.id,
          }),
        onRowUpdate: (newData, oldData) => updateCommand(newData.id, newData),
        onRowDelete: oldData => deleteCommand(oldData.id),
      }}
    />
  )
}

export default EditableCommands