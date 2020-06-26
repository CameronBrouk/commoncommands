import React from 'react'
// import { Tabs, Tab, TabPanel } from './Tabs'
// import { Paper, Typography } from '@material-ui/core'

// import * as Model from '../../models'
// import * as Style from './tabs.styles'
// import * as Helper from '../../helpers'

// import Commands from '../Commands/Commands'

// interface Props {
//   systems: Model.System[]
//   commands: Model.Command[]
// }
// const SystemTabs = ({ systems, commands }: Props) => {
//   const classes = Style.useStyles()
//   const [value, setValue] = React.useState(0)

//   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     setValue(newValue)
//   }

//   return (
//     <section className={classes.root}>
//       <div className={classes.customTabs}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label='styled tabs example'>
//           {systems &&
//             systems.map((system, i) => <Tab key={i} label={system.name} />)}
//         </Tabs>
//         <Typography className={classes.paddingBottom} />
//         {systems &&
//           systems.map((system, i) => (
//             <TabPanel value={value} index={i} key={i}>
//               <aside className='tab-content'>
//                 <Commands
//                   commands={Helper.filterCommandsBySystem(commands, system)}
//                   system={system}
//                 />
//               </aside>
//             </TabPanel>
//           ))}
//       </div>
//     </section>
//   )
// }

