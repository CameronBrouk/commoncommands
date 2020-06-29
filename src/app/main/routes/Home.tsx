import React from 'react'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'

import { useFirestore } from '../../shared/hooks'
import { System, Command } from '../models'

const Home = () => {
  const { getList$: getSystems$ } = useFirestore<System>('systems')
  const { getList$: getCommands$ } = useFirestore<Command>('commands')

  const [systems, commands] = useObservable(
    () => combineLatest(getSystems$(), getCommands$()),
    [[], []],
  )

  console.log('systems', systems)
  console.log('commands', commands)

  return (
    <div className='text-xl'>
      <h1>hello</h1>
    </div>
  )
}

export default Home
