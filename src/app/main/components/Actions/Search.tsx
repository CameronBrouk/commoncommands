import React, { useRef, useContext } from 'react'
import { useEventCallback, useObservable } from 'rxjs-hooks'
import { Drawer, Fab, TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
// prettier-ignore
import { map, tap, delay, debounceTime, distinctUntilChanged, } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Styles } from '../../../../styles/classes'
import { useLoading } from '../../../shared/hooks'
import { AppContext } from '../../../App.context'

interface Props {
  search: string
  setView: string
}

const Search = () => {
  const [isSearching, setIsSearching] = React.useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const { loading$ } = React.useContext(AppContext)
  const { startLoading } = useLoading()

  const loading = useObservable(() => loading$)

  const [onChange, filterString] = useEventCallback(
    (event$: Observable<any>) => {
      return event$.pipe(
        map(event => event.target.value),
        tap(startLoading),
        debounceTime(400),
        distinctUntilChanged(),
        delay(400),
      )
    },
  )

  const toggleDrawer = () => setIsSearching(searching => !searching)

  const handleClick = () => {
    toggleDrawer()
    inputRef.current && inputRef.current.focus()
  }

  const { center, searchField, searchFab } = Styles()
  return (
    <div>
      {loading && <h1>djfklasdjfd;laskjf;asldfk</h1>}
      {!isSearching && (
        <Fab
          color='primary'
          aria-label='search'
          onClick={handleClick}
          className={searchFab}>
          <SearchIcon />
        </Fab>
      )}
      <Drawer anchor='bottom' open={isSearching} onClose={toggleDrawer}>
        <div className={searchField}>
          <TextField
            ref={inputRef}
            onChange={onChange}
            className={searchField}
            label='Search For A Command'
            inputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Drawer>
    </div>
  )
}

export default Search
