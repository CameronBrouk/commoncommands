import React from 'react'
import { Tabs, Tab, TabPanel } from './Tabs'
import { Paper, Typography } from '@material-ui/core'
import { SystemForm, CommandForm } from '../../components'
import { useSystems, useCommands } from '../../hooks'
import { useObservable } from 'rxjs-hooks'

import * as Model from '../../models'
import * as Style from './tabs.styles'
import CommandsTable from '../Commands/CommandsTable'

const SystemTabs = () => {
  const classes = Style.useStyles()
  const [value, setValue] = React.useState(0)

  const { getSystems$ } = useSystems()
  const { getCommands$ } = useCommands()

  const systems = useObservable(() => getSystems$<Model.System>())

  const commands = useObservable(() => getCommands$<Model.Command>(), [])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <section className={classes.root}>
      <div className={classes.customTabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='styled tabs example'>
          {systems &&
            systems.map((system, i) => <Tab key={i} label={system.name} />)}
        </Tabs>
        <Typography className={classes.paddingBottom} />
        {systems &&
          systems.map((system, i) => (
            <TabPanel value={value} index={i} key={i}>
              <aside className='table'>
                <CommandsTable
                  commands={commands.filter(
                    command => command.systemRef === system.id,
                  )}
                  system={system}
                />
              </aside>
            </TabPanel>
          ))}
      </div>
    </section>
  )
}

export default SystemTabs
