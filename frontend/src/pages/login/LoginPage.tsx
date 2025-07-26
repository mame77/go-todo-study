import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/shared/ui'
import { useAuth } from '@/features/auth/AuthProvider'
import LoginForm from '@/widgets/LoginForm'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo')
    }
  }, [isAuthenticated, navigate])

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-bounce-in">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-full mb-4 border border-white/20">
              <i className="fas fa-rocket text-4xl text-yellow-400"></i>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Modern Todo</h1>
            <p className="text-gray-300">アカウントにログインして始めましょう</p>
          </div>

          <LoginForm />

          <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                <i className="fas fa-sync-alt text-purple-400"></i>
              </div>
              <p className="text-xs text-gray-300">同期</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                <i className="fas fa-shield-alt text-green-400"></i>
              </div>
              <p className="text-xs text-gray-300">セキュア</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                <i className="fas fa-mobile-alt text-blue-400"></i>
              </div>
              <p className="text-xs text-gray-300">モバイル対応</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}