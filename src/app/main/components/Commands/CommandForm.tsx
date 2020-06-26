import React from 'react'
import {Button} from '@material-ui/core'
import {useSystems} from '../../hooks'
import {useObservable} from 'rxjs-hooks'
import {pluck} from 'rxjs/operators'

const CommandForm = ({...props}: any) => {
  const {getSystems$} = useSystems()
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

