import React from 'react'
import MaterialTable, { Column } from 'material-table'

import * as Model from '../../models'
import { CollectionNames, useFirestore } from '../../../shared/hooks'
interface Props {
  collectionName: CollectionNames
  collection: Model.Command[] | Model.System[]
  columns: Array<Column<Model.Command | Model.System>>
}

const QuickEditorTable = ({ collection, collectionName, columns }: Props) => {
  const { update, remove, create } = useFirestore(collectionName)

  const title = 'Edit ' + collectionName

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={collection}
      editable={{
        onRowAdd: newData => create(newData),
        onRowUpdate: (newData, oldData) => update(newData.id, newData),
        onRowDelete: oldData => remove(oldData.id),
      }}
    />
  )
}

export default QuickEditorTable
