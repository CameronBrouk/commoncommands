import { Button, Input, Modal } from 'app/shared/components'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import QRCode from 'qrcode.react'
import { Document, useFirestore, User, Permissions, Role } from '../../firebase'
import { useObservable } from 'rxjs-hooks'

type Props = {
  user: Document<User>
  index: number
}

export const UserCard = ({ user, index }: Props) => {
  const { update, getSingle$ } = useFirestore<Permissions>('permissions')
  const [visible, setVisible] = useState(false)
  const form = useForm()

  const permissions = useObservable(() => getSingle$(user.id))

  type FormData = {
    role: Role
  }

  const approveUser = () => {
    update(user.id, { role: 'approved' })
  }

  const updateCode = (formData: FormData) => {
    update(user.id, formData)
    setVisible(false)
  }

  const getRoleColor = (role: Role) => {
    if (role === 'admin') return 'bg-blue-200'
    if (role === 'approved') return 'bg-green-200'
    if (role === 'awaiting-approval') return 'bg-yellow-200'
    return 'bg-teal-200'
  }

  return (
    <div className='col-span-1 bg-white rounded-lg shadow'>
      <Modal isVisible={visible} onClose={() => setVisible(false)}>
        <h2 className='content-center w-full p-2 text-lg text-center border-b-2'>
          {user.displayName || 'Unnamed User'}
        </h2>

        <div className='mt-5'>
          <form onSubmit={form.handleSubmit<FormData>(updateCode)}>
            <Input
              form={form}
              name='role'
              required
              pattern={/approved|admin|awaiting-approval/}
              label='Role(admin, approved, awaiting-approval)'
            />
            <Button variant='raised' type='submit' className='mx-4 mt-4'>
              Submit
            </Button>
          </form>
        </div>
      </Modal>

      <div className='flex items-center justify-between w-full p-6 space-x-6'>
        <div className='flex-1 truncate'>
          <div className='flex items-center space-x-3'>
            <h3 className='text-sm font-medium leading-5 text-gray-900 truncate'>
              {user.displayName || 'Unnamed User'}
            </h3>
            <span
              className={`flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 ${getRoleColor(
                permissions?.role || 'approved',
              )} text-xs leading-4 font-medium rounded-full`}>
              {permissions?.role}
            </span>
          </div>
          <p className='mt-1 text-sm leading-5 text-gray-500 truncate'>
            {user.email}
          </p>
        </div>
      </div>

      <div
        className={`${
          permissions?.role === 'awaiting-approval' && 'bg-green-500'
        } border-t border-gray-200`}>
        <div className='flex -mt-px'>
          <div className='flex flex-1 w-0 border-r border-gray-200'>
            <button
              onClick={() =>
                permissions?.role === 'awaiting-approval'
                  ? approveUser()
                  : setVisible(true)
              }
              className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10'>
              <span
                className={`ml-3 ${
                  permissions?.role === 'awaiting-approval' && 'text-white'
                }`}>
                {permissions?.role === 'awaiting-approval'
                  ? 'Approve User'
                  : 'Edit Permissions'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
