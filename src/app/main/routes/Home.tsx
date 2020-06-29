import React, { useState } from 'react'
import { animated } from 'react-spring'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'

import { Tabs, Tab, TabPanel } from '../components'
import { Styles } from '../../../styles/classes'

import { useUI } from '../../shared/hooks/'
import { useFirestore } from '../../shared/hooks'
import { System, Command } from '../models'

const Home = () => {
  const { isMobile } = useUI()
  const [bool, setBool] = useState(false)

  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const { getList$: getSystems$ } = useFirestore<System>('systems')
  const { getList$: getCommands$ } = useFirestore<Command>('commands')

  const [systems, commands] = useObservable(
    () => combineLatest(getSystems$(), getCommands$()),
    [[], []],
  )

  const handleTabChange = (event: any, newValue: number) => {
    setCurrentTabIndex(newValue)
  }

  const toggle = () => setBool(bool => !bool)

  const { tabs, home, desktopPanel, center } = Styles()
  return (
    <section className={home}>
      <button onClick={toggle}>BUTTON</button>
      {/* {systems && commands && (
        <div className={tabs}>
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            aria-label='choose which systems commands to show'>
            {systems.slice(0, 3).map(system => (
              <Tab key={system.id} label={system.name} />
            ))}
          </Tabs>
          {systems.slice(0, 3).map((system, i) => (
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
      )} */}
    </section>
  )
}

export default Home
