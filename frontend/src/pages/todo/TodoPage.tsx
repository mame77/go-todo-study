import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/shared/ui'
import { useAuth } from '@/features/auth/AuthProvider'
import { useTodoManager } from '@/entities/todo/TodoManager'
import TodoHeader from '@/widgets/TodoHeader'
import TodoInput from '@/widgets/TodoInput'
import TodoFilter from '@/widgets/TodoFilter'
import TodoList from '@/widgets/TodoList'
import TodoStats from '@/widgets/TodoStats'

export default function TodoPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const {
    todos,
    currentFilter,
    setCurrentFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    stats
  } = useTodoManager()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <TodoHeader />
        
        <div className="max-w-2xl mx-auto">
          <TodoInput onAddTodo={addTodo} />
          
          <TodoFilter 
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />
          
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
          
          <TodoStats stats={stats} />
        </div>
      </div>
    </Layout>
  )
}