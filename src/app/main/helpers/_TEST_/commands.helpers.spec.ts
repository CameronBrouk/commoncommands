import * as Helper from '../commands.helpers'

import * as MOCK_DATA from './MOCK_DATA'

describe('getCategoriesFromCommands', () => {
  test('It Returns Unique Categories', () => {
    const categories = Helper.getCategoriesFromCommands(MOCK_DATA.VimCommands)
    expect(categories).toEqual(MOCK_DATA.VimCategories)
  })
})

describe('sortCommandByCategory', () => {
  test('It Returns Dictionary', () => {
    const sortedDictionary = Helper.sortCommandByCategory(MOCK_DATA.VimCommands)

    expect(sortedDictionary).toEqual(MOCK_DATA.SortedVimDictionary)
  })
})

describe('categorizeCommandsBySystem', () => {
  test('It Returns Only Commands that match the system provided', () => {
    const filteredCommands = Helper.filterCommandsBySystem(
      MOCK_DATA.AllCommands,
      MOCK_DATA.VimSystem,
    )

    expect(filteredCommands).toEqual(MOCK_DATA.VimCommands)
  })
})
