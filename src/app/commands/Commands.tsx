import React, { useContext } from 'react'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'
import { filter } from 'rxjs/operators'

import { useFirestore } from '../shared/hooks'
import { System, Command } from './models'
import { CommandsContext } from './Commands.context'

export const Commands = () => {
  const { commands } = useContext(CommandsContext)

  return (
    <div className='text-xl'>
      <div></div>
    </div>
  )
}
