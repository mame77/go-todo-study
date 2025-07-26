import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { useAuth } from '@/features/auth/AuthProvider'

export default function TodoHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{user.name}</div>
                <div className="text-gray-400 text-sm">{user.email}</div>
              </div>
            </>
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLogout}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border-red-500/30"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>ログアウト
        </Button>
      </div>
      <h1 className="text-5xl font-bold text-white mb-4 animate-bounce-in">
        <i className="fas fa-rocket mr-3 text-yellow-400"></i>
        Modern Todo
      </h1>
      <p className="text-xl text-gray-300">効率的にタスクを管理しよう</p>
    </div>
  )
}