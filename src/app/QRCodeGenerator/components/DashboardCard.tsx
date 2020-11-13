import { Button, Input, Modal } from 'app/shared/components'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import QRCode from 'qrcode.react'
import { Document, useFirestore } from '../../firebase'
import { Code } from '../QRCode.types'

type Props = {
  qrCode: Document<Code>
  index: number
}

export const DashboardCard = ({ qrCode, index }: Props) => {
  const { title, impressions, canvasSettings, url } = qrCode
  const { update } = useFirestore<Code>('codes')
  const [visible, setVisible] = useState(false)
  const [downloadHref, setDownloadHref] = useState<string>()
  const form = useForm()

  useEffect(() => {
    const canvasEl = document.getElementById(
      `qrcode-${index}`,
    ) as HTMLCanvasElement
    if (!canvasEl) return
    setDownloadHref(canvasEl.toDataURL('image/png'))
  })

  type FormData = {
    title: string
    url: string
  }

  const updateCode = (formData: FormData) => {
    update(qrCode.id, formData)
    setVisible(false)
  }

  const validURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

  return (
    <li className='col-span-1 bg-white rounded-lg shadow'>
      <Modal isVisible={visible} onClose={() => setVisible(false)}>
        <h2 className='content-center w-full p-2 text-lg text-center border-b-2'>
          {qrCode.title}
        </h2>

        <div className='mt-5'>
          <form onSubmit={form.handleSubmit<FormData>(updateCode)}>
            <Input
              form={form}
              label='Title'
              defaultValue={title}
              name='title'
            />

            <Input
              form={form}
              defaultValue={url}
              pattern={validURL}
              label='URL'
              name='url'
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
              {/* Dr. Pepper Can */}
              {title}
            </h3>
            <span className='flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full'>
              {impressions} impressions
            </span>
          </div>
          <p className='mt-1 text-sm leading-5 text-gray-500 truncate'>{url}</p>
        </div>

        <QRCode
          {...canvasSettings}
          value={`https://alexander-qr.web.app/redirect/${qrCode.id}`}
          size={50}
          level='M'
        />

        <div className='hidden'>
          <QRCode
            {...canvasSettings}
            value={`https://alexander-qr.web.app/redirect/${qrCode.id}`}
            id={`qrcode-${index}`}
            size={200}
          />
        </div>
      </div>

      <div className='border-t border-gray-200'>
        <div className='flex -mt-px'>
          <div className='flex flex-1 w-0 border-r border-gray-200'>
            <button
              onClick={() => setVisible(true)}
              className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10'>
              <span className='ml-3'>Edit</span>
            </button>
          </div>
          <div className='flex flex-1 w-0 -ml-px'>
            {downloadHref && (
              <a
                href={downloadHref}
                download={title}
                className='relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10'>
                <span className='ml-3'>Download</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
