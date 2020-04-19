export interface Command {
  id: string
  systemRef: string
  name: string
  description?: string
  category: string
}

export type views = 'category' | 'search' | 'edit'
