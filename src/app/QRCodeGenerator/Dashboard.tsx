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
import { getMonth, isSameDay } from 'date-fns'
import { isSameMonth } from 'date-fns/esm'

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
  const [searching, setSearching] = useState(true)
  const [filteredCodes, setFilteredCodes] = useState<Document<Code>[]>([])

  const codes = useObservable<Document<Code>[]>(
    () =>
      list$.pipe(
        map(filterCodesByUser),
        tap(setImpressions),
        tap(codes => setFilteredCodes(codes)),
      ),
    [],
  )

  useEffect(() => {
    setSearching(true)
    if (searchTerm !== '')
      setFilteredCodes(codes.filter(code => searchObject(code, searchTerm)))

    setTimeout(() => setSearching(false), 300)
  }, [searchTerm])

  const filterCodesByUser = (codes: Document<Code>[]) =>
    codes.filter(code => code.owner === user.uid)

  const getTotalImpressions = (codes: Document<Code>[]) =>
    codes.reduce((total, code) => code.impressions + total, 0)

  const setImpressions = (codes: Document<Code>[]) =>
    setImpressionsInfo(info => ({
      total: getTotalImpressions(codes),
      thisDay: getTotalImpressions(
        codes.filter(code => isSameDay(new Date(code.updatedAt), new Date())),
      ),
      thisMonth: getTotalImpressions(
        codes.filter(code => isSameMonth(new Date(code.updatedAt), new Date())),
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
            <DashboardPanel
              title='This Month'
              value={impressionsInfo.thisMonth}
            />
            <DashboardPanel title='Today' value={impressionsInfo.thisDay} />
          </div>

          <h3 className='my-10 text-lg font-medium leading-6 text-gray-900 '>
            My QR Codes
          </h3>
          <div>
            <Search onSearch={filterCodes} />
          </div>
          <div className='flex justify-center'>
            {searching && (
              <img src={require('../../assets/loading-spinner.svg')} />
            )}
          </div>
          <ul className='grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-3'>
            {!searching &&
              filteredCodes.map((code, i) => (
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
