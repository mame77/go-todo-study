import { useState } from 'react'
import { useLocalStorage, useNotification } from '@/shared/lib/hooks'
import { Todo, FilterType } from '@/shared/lib/types'

export function useTodoManager() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const { showNotification } = useNotification()

  const addTodo = (text: string) => {
    if (text.trim()) {
      const todo: Todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      
      setTodos(prev => [todo, ...prev])
      showNotification('タスクが追加されました！', 'success')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => {
        if (todo.id === id) {
          const updated = { ...todo, completed: !todo.completed }
          showNotification(
            updated.completed ? 'タスクが完了しました！' : 'タスクが未完了に戻りました',
            updated.completed ? 'success' : 'info'
          )
          return updated
        }
        return todo
      })
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    showNotification('タスクが削除されました', 'error')
  }

  const getFilteredTodos = () => {
    switch (currentFilter) {
      case 'pending':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  const getStats = () => {
    const total = todos.length
    const completed = todos.filter(todo => todo.completed).length
    const pending = total - completed
    
    return { total, completed, pending }
  }

  return {
    todos: getFilteredTodos(),
    currentFilter,
    setCurrentFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    stats: getStats()
  }
}