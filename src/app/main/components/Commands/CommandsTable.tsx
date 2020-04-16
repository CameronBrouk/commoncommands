import React from 'react'
import MaterialTable, { Column } from 'material-table'
import { useCommands } from '../../hooks'

import * as Model from '../../models'
import { componentOverrides } from './table.styles'
import { useObservable } from 'rxjs-hooks'
import { map } from 'rxjs/operators'
import SystemForm from '../Forms/SystemForm'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

interface Props {
  commands: Model.Command[]
  system: Model.System
}

const CommandsTable = (props: Props) => {
  const { updateCommand, deleteCommand, createCommand } = useCommands()

  const style = {
    backgroundColor: '#2e1534',
    color: 'white',
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#eee',
      },
      secondary: {
        main: '#ff9100',
      },
    },
  })

  const columns: Array<Column<Model.Command>> = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Category', field: 'category' },
  ]
  // .map(column => ({ ...column, cellStyle: style, headerStyle: style }))

  const options = {
    // rowStyle: style,
    // headerStyle: style,
  }

  return (
    // <MuiThemeProvider theme={theme}>
    <MaterialTable
      title='Edit A Document'
      columns={columns}
      options={options}
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
      // components={componentOverrides}
    />
    // </MuiThemeProvider>
  )
}

export default CommandsTable
