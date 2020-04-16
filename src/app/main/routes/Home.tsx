import React from 'react'
import styled from 'styled-components'
import { SystemForm, CommandForm } from '../components'
import { useSystems } from '../hooks'
import { useObservable } from 'rxjs-hooks'

import * as Model from '../models'

const Home = ({ className }: any) => {
  const { getSystems$ } = useSystems()
  const systems = useObservable(() => getSystems$<Model.System>())
  console.log(systems)
  return (
    <section className={className}>
      <SystemForm />
    </section>
  )
}

export default styled(Home)``
