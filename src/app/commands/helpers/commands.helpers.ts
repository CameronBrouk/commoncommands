import * as Model from '../models'
import pipe from 'lodash/fp/flow'
import * as R from 'ramda'
import { System, Command } from '../models'

export const getCategoriesFromCommands = (
  commands: Model.Command[],
): string[] =>
  commands.reduce((categories: string[], command: Model.Command) => {
    const { category } = command
    return categories.includes(category)
      ? categories
      : [...categories, category]
  }, [])

type SortCommandsByCategory = (commands: Command[]) => Record<string, Command[]>
export const sortCommandsByCategory: SortCommandsByCategory = commands => {
  // prettier-ignore
  return pipe(
    getCategoriesFromCommands,
    reduceCommands(commands),
  )(commands)
}

const reduceCommands = (commands: Command[]) => (categories: string[]) =>
  R.reduce(
    (acc, curr: string) => ({
      ...acc,
      [curr]: commands.filter(command => command.category === curr),
    }),
    {},
  )(categories)

type FilterCommands = (
  commands: Command[],
  attribute: keyof Command,
) => Command[]

const filterCommands: FilterCommands = (commands, attribute) =>
  commands.filter(command => command[attribute] === attribute)

export const filterCommandsBySystem = (
  commands: Model.Command[],
  system: Model.System,
) => commands.filter(command => command.systemRef === system.id)

type GetSystemByName = (name: string, systems: Model.System[]) => System | {}
export const getSystemByName: GetSystemByName = (name, systems) =>
  systems.reduce((system, curr) => {
    if (curr.name === name) return curr
    return system
  }, {})

export const getSystemId = (currentSystem: string) => (systems: System[]) =>
  systems.filter(({ name }) => currentSystem === name).map(({ id }) => id)[0]
