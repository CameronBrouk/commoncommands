import React from 'react'
import styled from 'styled-components'
import {
  Paper,
  Tabs,
  Tab,
  withStyles,
  createStyles,
  Typography,
} from '@material-ui/core'
import { SystemForm, CommandForm } from '../components'
import { useSystems, useCommands } from '../hooks'
import { useObservable } from 'rxjs-hooks'

import * as Model from '../models'
import CommandsTable from '../components/Commands/CommandsTable'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {children}
    </Typography>
  )
}

const Home = ({ className }: any) => {
  const [value, setValue] = React.useState(0)
  const { getSystems$ } = useSystems()
  const { getCommands$ } = useCommands()

  const systems = useObservable(() => getSystems$<Model.System>())

  const commands = useObservable(() => getCommands$<Model.Command>(), [])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <section className={className}>
      <section className='tabs'>
        <Paper square>
          <Tabs
            value={value}
            centered
            indicatorColor='primary'
            textColor='primary'
            onChange={handleChange}
            aria-label='disabled tabs example'>
            {systems &&
              systems.map((system, i) => <Tab key={i} label={system.name} />)}
          </Tabs>
        </Paper>
      </section>
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
    </section>
  )
}

export default styled(Home)`
  .tabs {
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  .table {
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 0 auto;
  }
`
