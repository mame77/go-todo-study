import { useState } from 'react'
import { Button, Input, Card } from '@/shared/ui'

interface TodoInputProps {
  onAddTodo: (text: string) => void
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [todoText, setTodoText] = useState('')

  const handleSubmit = () => {
    if (todoText.trim()) {
      onAddTodo(todoText)
      setTodoText('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Card className="mb-8">
      <div className="flex gap-3">
        <Input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="新しいタスクを入力..."
          className="flex-1"
        />
        <Button onClick={handleSubmit}>
          <i className="fas fa-plus mr-2"></i>追加
        </Button>
      </div>
    </Card>
  )
}