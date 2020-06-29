import React from 'react'
import {Tabs, Tab, TabPanel} from '..'
import {Paper, Typography} from '@material-ui/core'

import * as Model from '../../models'
import * as Style from '../Commands/temp/tabs.styles'
import QuickEditorTable from './QuickEditorTable'

type CollectionNames = 'systems' | 'commands' | 'profiles'
type CollectionData = Model.System[] | Model.Command[]
interface Props {
  API: any
}

const QuickEditor = (props: Props) => {
  const classes = Style.useStyles()
  const [tabIndex, setTabIndex] = React.useState(0)

  const dictionaryArray = (dictionary: Record<any, any>) =>
    Object.entries(dictionary)

  const apiArray = dictionaryArray(props.API)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  const setColumns = (collectionData: CollectionData[]) => {
    const fieldNames = collectionData.map((data) => Object.keys(data))[0]
    return fieldNames.map((fieldName) => ({
      title: fieldName.toUpperCase(),
      field: fieldName,
    }))
  }

  return (
    <section className={classes.root}>
      <div className={classes.customTabs}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label='styled tabs example'>
          {props.API &&
            apiArray.map(([collectionName], i) => (
              <Tab key={i} label={collectionName} />
            ))}
        </Tabs>

        <Typography className={classes.paddingBottom} />

        {props.API &&
          apiArray.map((values) => console.log('values', values)) &&
          apiArray.map(([collectionName, collectionDataSet], i) => (
            <TabPanel value={i} index={i} key={i}>
              <QuickEditorTable
                collectionName={collectionName as any}
                collection={collectionDataSet}
                columns={setColumns(collectionDataSet)}
              />
            </TabPanel>
          ))}
      </div>
    </section>
  )
}
