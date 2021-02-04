import React from 'react'
import styled from 'styled-components'
import { UseFormMethods } from 'react-hook-form'
import { ModalProps, Modal } from './Modal'
import { Button } from '../../Button/Button'

type Props = {
  onSubmit: (data: any) => void
  form: UseFormMethods
  submitText?: string
  cancelText?: string
} & ModalProps

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
`

export const FormModal = ({
  isOpen,
  onSubmit,
  onClose,
  form,
  title,
  ...rest
}: Props) => {
  const { submitText, cancelText, children, ...props } = rest
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}

        <ActionButtons>
          <Button type='submit'>{submitText ? submitText : 'Submit'}</Button>
          <Button variant='warn' type='button' onClick={onClose}>
            {cancelText ? cancelText : 'Cancel'}
          </Button>
        </ActionButtons>
      </form>
    </Modal>
  )
}
