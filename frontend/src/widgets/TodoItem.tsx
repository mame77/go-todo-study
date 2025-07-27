import { Todo } from '@/shared/lib/types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`todo-item flex items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 animate-slide-in ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <button 
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
          todo.completed 
            ? 'bg-green-500 border-green-500' 
            : 'border-gray-400 hover:border-green-400'
        }`}
      >
        {todo.completed && <i className="fas fa-check text-white text-xs"></i>}
      </button>
      
      <span className={`flex-1 text-white transition-all duration-300 ${
        todo.completed ? 'line-through text-gray-400' : ''
      }`}>
        {todo.text}
      </span>
      
      <button 
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 flex items-center justify-center"
      >
        <i className="fas fa-trash text-sm"></i>
      </button>
    </div>
  )
}