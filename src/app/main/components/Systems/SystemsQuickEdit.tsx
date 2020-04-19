import React from 'react'
import MaterialTable, { Column } from 'material-table'
import { useSystems } from '../../hooks'

import * as Model from '../../models'
interface Props {
  commands: Model.System[]
}

const SystemsQuickEdit = (props: Props) => {
  const { updateSystem, deleteSystem, createSystem } = useSystems()

  const columns: Array<Column<Model.System>> = [
    { title: 'Name', field: 'name' },
  ]

  return (
    <MaterialTable
      title='Edit A Document'
      columns={columns}
      data={props.commands}
      editable={{
        onRowAdd: newData => createSystem({ name: newData.name }),
        onRowUpdate: (newData, oldData) => updateSystem(newData.id, newData),
        onRowDelete: oldData => deleteSystem(oldData.id),
      }}
    />
  )
}

export default SystemsQuickEdit
