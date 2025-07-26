import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthProvider'
import LoginPage from '@/pages/login/LoginPage'
import TodoPage from '@/pages/todo/TodoPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App