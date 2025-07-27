import { Card } from '@/shared/ui'
import { Todo } from '@/shared/lib/types'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <Card className="min-h-[400px]">
      {todos.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <i className="fas fa-clipboard-list text-6xl mb-4 opacity-50"></i>
          <p className="text-xl">タスクがありません</p>
          <p className="text-sm">新しいタスクを追加して始めましょう！</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </Card>
  )
}