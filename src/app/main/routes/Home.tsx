import React, { useState } from 'react'
import { animated } from 'react-spring'
import { useObservable } from 'rxjs-hooks'
import { combineLatest } from 'rxjs'

import { useSystems, useCommands } from '../hooks'
import { Tabs, Tab, TabPanel } from '../components'
import { Styles } from '../../../styles/classes'

import * as Model from '../models'
import * as Helper from '../helpers'

import Commands from '../components/Commands/Commands'
import { useUI } from '../../shared/hooks/ui.hooks'
import { useKeybind, useToggleAnimation } from '../../shared/hooks'
import { TestOptionsComponent } from '../../shared/hooks/useOptionsList/mock/mockComponent'

const Home = () => {
  const { isMobile } = useUI()
  const [bool, setBool] = useState(false)
  const { slideLeft, slideRight, grow, fade } = useToggleAnimation(bool)

  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const { getSystems$ } = useSystems()
  const { getCommands$ } = useCommands()

  const [systems, commands] = useObservable(() => {
    const systems$ = getSystems$<Model.System>()
    const commands$ = getCommands$<Model.Command>()
    return combineLatest(systems$, commands$)
  }, [[], []])

  const handleTabChange = (event: any, newValue: number) => {
    setCurrentTabIndex(newValue)
  }

  const toggle = () => setBool(bool => !bool)

  const { tabs, home, desktopPanel, center } = Styles()
  return (
    <section className={home}>
      <button onClick={toggle}>BUTTON</button>
      {/* <animated.div style={fade}>dkfjadslfkksdf;jlakf</animated.div> */}
      {/* {bool && (
        <animated.div style={slideLeft}>dkfjadslfkksdf;jlakf</animated.div>
      )} */}
      {/* <animated.div style={slideLeft}>dkfjadslfkksdf;jlakf</animated.div> */}
      <animated.div style={slideLeft}>
        <div style={{ background: 'red', height: '10vh', width: '10vw' }}></div>
      </animated.div>
      <div>dkfjadslfkksdf;jlakf</div>
      <TestOptionsComponent />
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
