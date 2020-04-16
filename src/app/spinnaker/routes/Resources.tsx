import React from 'react'
import styled from 'styled-components'
import { Heading } from '../../shared/components'

interface Props {
  className?: any
}

const Resources = (props: Props) => {
  return (
    <main className={props.className}>
      <Heading title='Use Our Resources' />
    </main>
  )
}

export default styled(Resources)``
