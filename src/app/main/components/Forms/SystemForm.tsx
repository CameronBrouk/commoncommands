import React from 'react'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import { TextField } from 'mui-rff'
import { Button } from '@material-ui/core'
import { useSystems } from '../../hooks/systems.hooks'

const SystemForm = ({ ...props }: any) => {
  const { createSystem } = useSystems()

  const handleSubmit = (formData: any) => createSystem({ name: formData.name })

  return (
    <div className={props.className}>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, pristine, valid }) => (
          <form onSubmit={handleSubmit} className='create-system-form'>
            <TextField label='System Name' name='name' required={true} />
            <Button
              className='create-system-button'
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

  .create-system-form {
    display: flex;
  }

  .create-system-button {
    margin-top: 10px;
    height: 90%;
    margin-left: 5px;
  }
`
