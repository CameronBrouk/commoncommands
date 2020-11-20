import { CurrentUserContext, useFirestore, Document } from 'app/firebase'
import { Button, Input, Modal, Popup, Search } from 'app/shared/components'
import QRCode from 'qrcode.react'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useObservable } from 'rxjs-hooks'
import { Code } from './QRCode.types'
import { tap, map, filter } from 'rxjs/operators'
import { DashboardCard } from './components'
import { DashboardPanel } from './components/DashboardPanel'
import { searchObject } from '../shared/utils'

type ImpressionsInfo = {
  total: number
  thisMonth: number
  thisDay: number
}

export const Dashboard = () => {
  const { list$ } = useFirestore<Code>('codes')
  const { user } = useContext(CurrentUserContext)
  const [impressionsInfo, setImpressionsInfo] = useState<ImpressionsInfo>({
    total: 0,
    thisMonth: 0,
    thisDay: 0,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCodes, setFilteredCodes] = useState<Document<Code>[]>([])

  const codes = useObservable<Document<Code>[]>(
    () =>
      list$.pipe(
        map(filterCodesByUser),
        tap(setTotalImpressions),
        tap(codes => setFilteredCodes(codes)),
      ),
    [],
  )

  useEffect(() => {
    if (searchTerm !== '')
      setFilteredCodes(codes.filter(code => searchObject(code, searchTerm)))
  }, [searchTerm])

  console.log('test')

  const filterCodesByUser = (codes: Document<Code>[]) =>
    codes.filter(code => code.owner === user.uid)

  const setTotalImpressions = (impressions: Document<Code>[]) =>
    setImpressionsInfo(info => ({
      ...info,
      total: impressions.reduce(
        (total, currImpression) => currImpression.impressions + total,
        0,
      ),
    }))

  const filterCodes = (event: any) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h1 className='p-5 text-xl font-semibold text-gray-900'>Dashboard</h1>
      <div className='mt-8'>
        <div className='max-w-6xl px-4 mx-auto sm:px-6 lg:px-8'>
          <h2 className='text-lg font-medium leading-6 text-cool-gray-900'>
            Impressions
          </h2>

          <div className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3'>
            <DashboardPanel title='All Time' value={impressionsInfo.total} />
            <DashboardPanel title='Last 30 Days' value={2432} />
            <DashboardPanel title='Today' value={78} />
          </div>

          <h3 className='my-10 text-lg font-medium leading-6 text-gray-900 '>
            My QR Codes
          </h3>
          <div>
            <Search onSearch={filterCodes} />
          </div>
          <ul className='grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredCodes.map((code, i) => (
              <div key={i}>
                <DashboardCard qrCode={code} index={i} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
