import { useFirestore, useRouter } from 'app/shared/hooks'
import { tap, first } from 'rxjs/operators'
import React, { useState } from 'react'
import { Code } from './QRCode.types'
import { useObservable } from 'rxjs-hooks'

export const Redirect = () => {
  const { routeParams } = useRouter<{ id: string }>()
  const { getSingle$, update } = useFirestore<Code>('codes')

  useObservable(() =>
    getSingle$(routeParams.id).pipe(
      tap(async ({ impressions, url }) => {
        await update(routeParams.id, { impressions: impressions + 1 })
        document.location.replace(getUrl(url))
      }),
      first(),
    ),
  )

  const getUrl = (url: string) => {
    if (url.includes('https://')) return url
    if (url.includes('http://')) return url.replace('http://', 'https://')
    if (url.includes('www.')) return url.replace('www.', 'https://')
    return 'https://' + url
  }

  return (
    <div className='flex justify-center'>
      <img src={require('../../assets/loading-spinner.svg')} />
    </div>
  )
}
