import React from 'react'
import { Mask } from './Mask'
import { useKeybind } from '../../../hooks'
import {
  ModalContent,
  Dialog,
  LeftPanel,
  RightPanel,
  TopPanel,
} from '../modal.styles'
import { getModalTransition } from '../modal.helpers'

export type ModalTypes = 'modal' | 'right-panel' | 'left-panel' | 'top-panel'

export type ModalProps = {
  children?: any
  isOpen: boolean
  title: string
  onClose: () => void
  type?: ModalTypes
}

export const Modal = ({ children, isOpen, title, ...props }: ModalProps) => {
  useKeybind(['Escape'], props.onClose)

  const modalProps = {
    isVisible: isOpen,
    transition: getModalTransition(props.type),
  }

  const PopupContent = () => (
    <>
      <ModalContent>
        <button onClick={props.onClose}>
          <svg
            className='m-4 rounded w-7 h-7 hover:bg-gray-100'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <h2>{title}</h2>
      </ModalContent>
      {children}
    </>
  )

  return (
    <>
      <Mask isVisible={isOpen} onClick={props.onClose} />
      {!props.type && <Dialog {...modalProps}> {PopupContent()} </Dialog>}

      {props.type === 'left-panel' && (
        <LeftPanel {...modalProps}>{PopupContent()}</LeftPanel>
      )}

      {props.type === 'right-panel' && (
        <RightPanel {...modalProps}>{PopupContent()}</RightPanel>
      )}

      {props.type === 'top-panel' && (
        <TopPanel {...modalProps}>{PopupContent()}</TopPanel>
      )}
    </>
  )
}
