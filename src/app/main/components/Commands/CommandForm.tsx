import React from 'react'
import { Button } from '@material-ui/core'
import { useObservable } from 'rxjs-hooks'
import { pluck } from 'rxjs/operators'
import { useFirestore } from 'app/shared/hooks'
import { System } from 'app/main/models'

const CommandForm = ({ ...props }: any) => {
  const { getList$: getSystems$ } = useFirestore<System>('systems')
  const systems = useObservable(() => getSystems$().pipe(pluck('name')))
  const handleSubmit = (formData: any) => {}

  return (
    <div className={props.className}>
      <h1>Create Command</h1>
      <form onSubmit={handleSubmit}>
        <Button type='submit' color='primary' variant='contained'>
          Create
        </Button>
      </form>
    </div>
  )
}

export default CommandForm
