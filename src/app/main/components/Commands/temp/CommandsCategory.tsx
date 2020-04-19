import React from 'react'
import styled from 'styled-components'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import * as Model from '../../../models'
import * as Helper from '../../../helpers'
import CommandsTable from '../Commands'

interface Props {
  commands: Model.Command[]
}

const CommandCategory = ({ commands }: Props) => {
  const categories = Helper.getCategoriesFromCommands(commands)
  const commandsByCategory = Helper.sortCommandByCategory(commands)
  return (
    <>
      {categories &&
        categories.map((category, i) => (
          <>
            <ExpansionPanel key={i}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                {category}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CommandsTable
                  commands={commandsByCategory[category]}
                  system={{ id: '1', name: 'windows' }}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        ))}
    </>
  )
}

export default styled(CommandCategory)`
  h1 {
    color: white;
  }
`
