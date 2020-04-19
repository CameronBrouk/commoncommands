import React from 'react'
import MaterialTable, { Column } from 'material-table'
import { useCommands } from '../../hooks'

import * as Model from '../../models'
import { useFirestore } from '../../../shared/hooks'

interface Props {
  collectionName: string
  collection: Model.Command[] | Model.System[]
  columns: Array<Column<Model.Command | Model.System>>
}

const QuickEditorTable = ({ collection, collectionName, columns }: Props) => {
  const { updateDocument, deleteDocument, createDocument } = useFirestore(
    collectionName,
  )

  const title = 'Edit ' + collectionName

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={collection}
      editable={{
        onRowAdd: newData => createDocument(newData),
        onRowUpdate: (newData, oldData) => updateDocument(newData.id, newData),
        onRowDelete: oldData => deleteDocument(oldData.id),
      }}
    />
  )
}

export default QuickEditorTable
