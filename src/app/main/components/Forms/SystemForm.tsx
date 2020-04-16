import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { MatTextField } from '../../../shared/components/final-form'
import { Button } from '@material-ui/core'
import { useSystems } from '../../hooks/systems.hooks'

const SystemForm = ({ ...props }: any) => {
  const { createSystem } = useSystems()
  const handleSubmit = (formData: any) => {
    createSystem({ name: formData.name })
  }

  return (
    <div className={props.className}>
      <h1>Create System</h1>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, pristine, valid }) => (
          <form onSubmit={handleSubmit}>
            <div className='fields'>
              <Field
                name='name'
                label='name'
                required
                component={MatTextField}
              />
            </div>
            <Button
              disabled={submitting || pristine || !valid}
              type='submit'
              color='primary'
              variant='contained'>
              Create
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

  .buttons {
    margin-top: 10px;
    align-items: left;
    justify-content: left;
    text-align: left;
  }
`
