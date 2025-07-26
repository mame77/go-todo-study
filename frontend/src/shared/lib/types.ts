export interface User {
  id?: string
  name: string
  email: string
  avatar?: string
}

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

export type FilterType = 'all' | 'pending' | 'completed'