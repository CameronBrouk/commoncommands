import React from 'react'
import styled from 'styled-components'
import { useSystems, useCommands } from '../hooks'
import { useObservable } from 'rxjs-hooks'

import * as Model from '../models'
import SystemTabs from '../components/Tabs/SystemTabs'

const Home = ({ className }: any) => {
  const [value, setValue] = React.useState(0)
  const { getSystems$ } = useSystems()
  const { getCommands$ } = useCommands()

  const systems = useObservable(() => getSystems$<Model.System>())
  const commands = useObservable(() => getCommands$<Model.Command>(), [])

  return (
    <section className={className}>
      <SystemTabs />
    </section>
  )
}

export default styled(Home)``
