import * as Model from '../models'

export const getCategoriesFromCommands = (
  commands: Model.Command[],
): string[] =>
  commands.reduce((categories: string[], command: Model.Command) => {
    const { category } = command
    return categories.includes(category)
      ? categories
      : [...categories, category]
  }, [])

type SortedCommands = Record<string, Model.Command[]>
export const sortCommandByCategory = (
  commands: Model.Command[],
): SortedCommands => {
  const categories = getCategoriesFromCommands(commands)
  return categories.reduce(
    (categoryDictionary, category) => ({
      ...categoryDictionary,
      [category]: commands.filter(command => command.category === category),
    }),
    {},
  )
}

export const filterCommandsBySystem = (
  commands: Model.Command[],
  system: Model.System,
) => commands.filter(command => command.systemRef === system.id)
