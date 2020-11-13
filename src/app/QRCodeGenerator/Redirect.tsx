import { useFirestore, useRouter } from 'app/shared/hooks'
import { tap, first } from 'rxjs/operators'
import React from 'react'
import { Code } from './QRCode.types'
import { useObservable } from 'rxjs-hooks'

export const Redirect = () => {
  const { routeParams } = useRouter<{ id: string }>()
  const { getSingle$, update } = useFirestore<Code>('codes')

  useObservable(() =>
    getSingle$(routeParams.id).pipe(
      tap(({ impressions, url }) =>
        update(routeParams.id, { impressions: impressions + 1 }).then(() => {
          document.location.replace(url)
        }),
      ),
      first(),
    ),
  )

  return (
    <div className='flex justify-center'>
      <img src={require('../../assets/loading-spinner.svg')} />
    </div>
  )
}
