import React from 'react'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import { TextField } from 'mui-rff'
import { Button } from '@material-ui/core'
import { useSystems } from '../../hooks/systems.hooks'
import { useObservable } from 'rxjs-hooks'
import { iif, of } from 'rxjs'

import * as Model from '../../models'

interface Props {
  className?: any
  systemId?: string
}

type FormData = { name: string }

const SystemForm = ({ systemId, className }: Props) => {
  const { createSystem, getSystem$, updateSystem } = useSystems()

  const system: Model.System | null = useObservable(() =>
    !!systemId ? getSystem$<Model.System>(systemId) : of(),
  )

  const defaultInputLabel = system ? system.name : 'System Name'
  const defaultValue = system ? system.name : ''
  const defaultButtonLabel = system ? 'Update' : 'Create'

  const handleSubmit = (formData: FormData) => {
    if (system) {
      updateSystem(system.id, { name: formData.name })
    } else {
      createSystem({ name: formData.name })
    }
  }

  return (
    <div className={className}>
      <Form
        onSubmit={handleSubmit}
        initialValues={{ name: defaultValue }}
        render={({ handleSubmit, submitting, pristine, valid }) => (
          <form onSubmit={handleSubmit} className='create-system-form'>
            <TextField label={defaultInputLabel} name='name' required={true} />

            <Button
              className='create-system-button'
              disabled={submitting || pristine || !valid}
              type='submit'
              color='primary'
              variant='contained'>
              {defaultButtonLabel}
            </Button>
          </form>
        )}
      />
    </div>
  )
}

export default styled(SystemForm)`
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .create-system-form {
    display: flex;
  }

  .create-system-button {
    margin-top: 10px;
    height: 90%;
    margin-left: 5px;
  }
`
