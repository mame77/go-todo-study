import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '@/shared/ui'
import { useAuth } from '@/features/auth/AuthProvider'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleGitHubLogin = () => {
    setLoading(true)
    setTimeout(() => {
      login({
        name: 'GitHub User',
        email: 'user@github.com',
        avatar: 'https://github.com/github.png'
      })
      setLoading(false)
      navigate('/todo')
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      login({
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      })
      setLoading(false)
      navigate('/todo')
    }, 1000)
  }

  const handleDemoLogin = () => {
    setLoading(true)
    setTimeout(() => {
      login({
        name: 'Demo User',
        email: 'demo@example.com'
      })
      setLoading(false)
      navigate('/todo')
    }, 1000)
  }

  return (
    <>
      <Card className="p-8 animate-slide-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">おかえりなさい</h2>
          <p className="text-gray-300">お好みの方法でログインしてください</p>
        </div>

        <div className="space-y-4">
          <Button
            variant="github"
            fullWidth
            onClick={handleGitHubLogin}
            disabled={loading}
          >
            <i className="fab fa-github text-xl group-hover:scale-110 transition-transform duration-300"></i>
            <span>GitHubでログイン</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-arrow-right"></i>
            </div>
          </Button>

          <Button
            variant="google"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Googleでログイン</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-arrow-right text-gray-600"></i>
            </div>
          </Button>
        </div>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <span className="px-4 text-sm text-gray-400">または</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        <Button
          variant="demo"
          fullWidth
          onClick={handleDemoLogin}
          disabled={loading}
        >
          <i className="fas fa-user-circle text-xl group-hover:scale-110 transition-transform duration-300"></i>
          <span>デモアカウントでログイン</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i className="fas fa-arrow-right"></i>
          </div>
        </Button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            ログインすることで、
            <a href="#" className="text-purple-400 hover:text-purple-300 underline">利用規約</a>
            および
            <a href="#" className="text-purple-400 hover:text-purple-300 underline">プライバシーポリシー</a>
            に同意したものとみなされます。
          </p>
        </div>
      </Card>

      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="p-8 text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">ログイン中...</p>
            <p className="text-gray-300 text-sm mt-2">しばらくお待ちください</p>
          </Card>
        </div>
      )}
    </>
  )
}