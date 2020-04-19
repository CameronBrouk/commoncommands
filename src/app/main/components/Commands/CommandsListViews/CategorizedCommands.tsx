import React from 'react'

// prettier-ignore
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Command } from '../../../models'
import * as Helper from '../../../helpers'
import { Styles } from '../../../../../styles/classes'

interface Props {
  commands: Command[]
}

const CategorizedCommands = ({ commands }: Props) => {
  const { table, colHeader } = Styles()

  const categories = Helper.getCategoriesFromCommands(commands)
  const commandsByCategory = Helper.sortCommandByCategory(commands)

  return (
    <>
      {categories &&
        categories.map((category, i) => (
          <ExpansionPanel key={i}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {category}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TableContainer component={Paper} className={table}>
                <Table aria-label='Edit Commands'>
                  <TableHead>
                    <TableRow>
                      <TableCell className={colHeader}>Command</TableCell>
                      <TableCell className={colHeader}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commandsByCategory &&
                      commandsByCategory[category].map((command, i) => (
                        <TableRow key={i}>
                          <TableCell component='th' scope='row'>
                            <b>{command.name}</b>
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {command.description}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </>
  )
}

export default CategorizedCommands
