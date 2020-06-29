import React, { useRef } from 'react'
import { useEventCallback } from 'rxjs-hooks'
import { Drawer, Fab, TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
// prettier-ignore
import { map, delay, debounceTime, distinctUntilChanged, } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Styles } from '../../../../styles/classes'

interface Props {
  search: string
  setView: string
}

const Search = () => {
  const [isSearching, setIsSearching] = React.useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const [onChange] = useEventCallback((event$: Observable<any>) => {
    return event$.pipe(
      map(event => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      delay(400),
    )
  })

  const toggleDrawer = () => setIsSearching(searching => !searching)

  const handleClick = () => {
    toggleDrawer()
    inputRef.current && inputRef.current.focus()
  }

  const { searchField, searchFab } = Styles()
  return (
    <div>
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
