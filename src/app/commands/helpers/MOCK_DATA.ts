import * as Model from '../models'

type PartialCommand = { name: string; category: string }

export const addMockAttributes = (attributes: any) => (
  commandArray: PartialCommand[],
): Model.Command[] =>
  commandArray.map(command => ({
    systemRef: '1',
    description: '',
    ...attributes,
    ...command,
  }))

export const addMockVimAttributes = addMockAttributes({
  id: '1',
  systemRef: '1',
})
export const addMockGitAttributes = addMockAttributes({
  id: '2',
  systemRef: '2',
})

export const VimSystem = { id: '1', name: 'Vim' }

export const VimCategories = ['Simple Navigation', 'Edit A Line']

export const VimCommands = addMockVimAttributes([
  { name: 'h, j, k, l', category: 'Simple Navigation' },
  { name: 'w / W', category: 'Simple Navigation' },
  { name: 'C / cc', category: 'Edit A Line' },
  { name: 'D / dd', category: 'Edit A Line' },
])

export const GitCommands = addMockGitAttributes([
  { name: 'git commit --ammend', category: 'git commit' },
  { name: 'git commit -am', category: 'git commit' },
  { name: 'git rebase -i', category: 'git rebase' },
])

export const AllCommands = [...VimCommands, ...GitCommands]

export const SortedVimDictionary = {
  'Simple Navigation': addMockVimAttributes([
    { name: 'h, j, k, l', category: 'Simple Navigation' },
    { name: 'w / W', category: 'Simple Navigation' },
  ]),
  'Edit A Line': addMockVimAttributes([
    { name: 'C / cc', category: 'Edit A Line' },
    { name: 'D / dd', category: 'Edit A Line' },
  ]),
}
