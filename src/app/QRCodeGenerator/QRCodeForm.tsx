import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActionCard } from './components'
import { Code } from './QRCode.types'

import QRCode from 'qrcode.react'
import * as C from '../shared/components'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../shared/components'
import { useFirestore, Document, CurrentUserContext } from 'app/firebase'
import { useRouter, useUI } from 'app/shared/hooks'
import { useObservable } from 'rxjs-hooks'

export const QRCodeForm = () => {
  const form = useForm()
  const { createWithId, list$ } = useFirestore<Code>('codes')
  const [example, setExample] = useState<any>()
  const [svgURI, setSvgURI] = useState<string>()
  const { isMobile } = useUI()

  useEffect(() => {
    const svg = document.getElementById('svg') as HTMLCanvasElement
    if (!svg) return
    setSvgURI(getPngSrc(svg))
  })

  const getPngSrc = (el: HTMLCanvasElement) => el.toDataURL('image/png')

  const onSubmit = async (formData: any) => {
    const { title, url, ...canvasSettings } = formData
    const qrCode: Code = {
      title: title,
      url: url,
      impressions: 0,
      canvasSettings: canvasSettings,
    }

    const id = await createWithId(qrCode)

    setExample({
      ...formData,
      id: id,
    })
  }

  const validURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto '>
      <h1 className='p-5 pl-0 text-xl font-semibold text-gray-900'>
        Generate QR Code
      </h1>

      <div className={`${isMobile ? '' : 'flex'}`}>
        <div className={isMobile ? 'p-2' : 'w-1/2'}>
          <Input form={form} required label='Title' name='title' autoFocus />

          <Input
            form={form}
            required
            label='Url'
            name='url'
            pattern={validURL}
          />

          <Input
            form={form}
            label='Background Color'
            defaultValue='#eeeeee'
            name='bgColor'
          />

          <Input
            form={form}
            label='Foreground Color'
            defaultValue='#000000'
            name='fgColor'
          />

          <Input form={form} label='Size' name='size' defaultValue='200' />

          <Button variant='raised' type='submit' className='m-5'>
            Generate QR Code
          </Button>
        </div>

        <div className={isMobile ? 'm-2' : 'm-10'}>
          <div className='mb-5'>
            {svgURI && (
              <a
                href={svgURI}
                download={`${example.title}`}
                className='px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline'>
                Download
              </a>
            )}
          </div>

          {example && (
            <>
              <QRCode
                value={`https://alexander-qr.web.app/redirect/${example.id}`}
                bgColor={example.bgColor || '#eee'}
                fgColor={example.fgColor || '#000'}
                size={example.size}
                level='H'
                renderAs={'svg'}
                id='svg'
              />
            </>
          )}
        </div>
      </div>
    </form>
  )
}
