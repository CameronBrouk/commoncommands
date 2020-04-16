import React from 'react'
import styled from 'styled-components'
import { SystemForm, CommandForm } from '../components'
import { useSystems, useCommands } from '../hooks'
import { useObservable } from 'rxjs-hooks'

import * as Model from '../models'
import CommandsTable from '../components/Commands/CommandsTable'

const Home = ({ className }: any) => {
  const { getSystems$ } = useSystems()
  const { getCommands$ } = useCommands()

  const systems = useObservable(() => getSystems$<Model.System>())
  console.log(systems)

  const commands = useObservable(() => getCommands$<Model.Command>(), [])
  console.log(commands)

  return (
    <section className={className}>
      {/* <SystemForm /> */}
      <CommandsTable commands={commands} />
    </section>
  )
}

export default styled(Home)``
