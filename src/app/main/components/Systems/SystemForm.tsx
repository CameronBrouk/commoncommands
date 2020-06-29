import React from 'react'
import { Button, IconButton } from '@material-ui/core'
import CloseOutlinedIcon from '@material-ui/icons/Close'
import { useObservable } from 'rxjs-hooks'
import { of } from 'rxjs'

import * as Model from '../../models'
import { useFirestore } from 'app/shared/hooks'

interface Props {
  systemId?: string
}

const SystemForm = ({ systemId }: Props) => {
  const {
    create: createSystem,
    getSingle$: getSystem$,
    update: updateSystem,
    remove: deleteSystem,
  } = useFirestore<Model.System>('systems')

  const system: Model.System | null = useObservable(() =>
    !!systemId ? getSystem$(systemId) : of(),
  )

  const defaultInputLabel = system ? system.name : 'System Name'
  const defaultValue = system ? system.name : ''
  const defaultButtonLabel = system ? 'Update' : 'Create'

  const handleSubmit = (formData: any) => {
    if (system) {
      updateSystem(system.id, { name: formData.name })
    } else {
      createSystem({ name: formData.name })
    }
  }

  return (
    <div>
      <form>
        <Button
          // disabled={submitting || pristine || !valid}
          type='submit'
          color='primary'
          variant='contained'>
          {defaultButtonLabel}
        </Button>
      </form>

      {system && (
        <IconButton type='button' onClick={() => deleteSystem(system.id)}>
          <CloseOutlinedIcon />
        </IconButton>
      )}
    </div>
  )
}

export default SystemForm
