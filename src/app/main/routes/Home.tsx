import React, { useState } from 'react'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'

import { useSystems, useCommands } from '../hooks'
import { Tabs, Tab, TabPanel } from '../components'
import { Styles } from '../../../styles/classes'
// import { materialClasses } from '../main.styles'

import * as Model from '../models'
import * as Helper from '../helpers'

import Commands from '../components/Commands/Commands'
import { useUI } from '../../shared/hooks/ui.hooks'

const Home = () => {
  const { isMobile } = useUI()

  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const { getSystems$ } = useSystems()
  const { getCommands$ } = useCommands()

  const [systems, commands] = useObservable(() => {
    const systems$ = getSystems$<Model.System>()
    const commands$ = getCommands$<Model.Command>()
    return combineLatest(systems$, commands$)
  }, [[], []])

  const handleChange = (event: any, newValue: number) => {
    setCurrentTabIndex(newValue)
  }

  const { tabs, home, desktopPanel, center } = Styles()
  return (
    <section className={home}>
      {systems && commands && (
        <div className={tabs}>
          <Tabs
            value={currentTabIndex}
            onChange={handleChange}
            aria-label='choose which systems commands to show'>
            {systems.map(system => (
              <Tab key={system.id} label={system.name} />
            ))}
          </Tabs>

          {systems.map((system, i) => (
            <aside className={!isMobile ? desktopPanel : center}>
              <TabPanel value={currentTabIndex} index={i} key={i}>
                <Commands
                  commands={Helper.filterCommandsBySystem(commands, system)}
                  system={system}
                />
              </TabPanel>
            </aside>
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
