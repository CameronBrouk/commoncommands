import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { MatTextField } from '../../../shared/components/final-form'
import { Button } from '@material-ui/core'

const CommandForm = ({ ...props }: any) => {
  const handleSubmit = (formData: any) => {}

  return (
    <div className={props.className}>
      <h1>Create Command</h1>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, pristine, valid }) => (
          <form onSubmit={handleSubmit}>
            <div className='fields'>
              <Field
                name='command'
                label='command'
                required
                component={MatTextField}
              />
              <Field
                name='description'
                label='description'
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

export default styled(CommandForm)`
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
