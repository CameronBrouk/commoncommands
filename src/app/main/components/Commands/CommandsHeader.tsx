import React from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'

import { Styles } from '../../../../styles/classes'

interface Props {
  setView: (view: 'search' | 'edit' | 'category') => void
  className?: any
}

const CommandsHeader = ({ setView, className }: Props) => {
  const { radioButton, center, background } = Styles()

  const [radioValue, setRadioValue] = React.useState('category')

  const handleChange = (event: any) => {
    const { value } = event.target
    setRadioValue(value)
    setView(value)
  }

  return (
    <div className={center} style={{ color: 'white' }}>
      <FormControl component='fieldset'>
        <FormLabel component='legend'></FormLabel>
        <RadioGroup
          row
          aria-label='position'
          name='position'
          onChange={handleChange}
          defaultValue='category'>
          <FormControlLabel
            value='category'
            control={<Radio color='secondary' className={radioButton} />}
            label='Categorize'
          />
          <FormControlLabel
            value='search'
            control={<Radio color='secondary' className={radioButton} />}
            label='Search'
          />
          <FormControlLabel
            value='edit'
            label='Edit'
            control={<Radio color='secondary' className={radioButton} />}
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default CommandsHeader
