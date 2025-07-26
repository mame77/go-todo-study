import { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage, useNotification } from '@/shared/lib/hooks'
import { User } from '@/shared/lib/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('user', null)
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false)
  const { showNotification } = useNotification()

  const login = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    showNotification('ログインしました', 'success')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('oauth_state')
    localStorage.removeItem('todos')
    showNotification('ログアウトしました', 'info')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}