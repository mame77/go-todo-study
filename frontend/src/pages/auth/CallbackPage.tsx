import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'
import { getAuthParamsFromURL, verifyOAuthState } from '@/shared/lib/auth'
import { Layout } from '@/shared/ui'

export default function CallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { code, state, error } = getAuthParamsFromURL()

        if (error) {
          throw new Error(`認証エラー: ${error}`)
        }

        if (!code || !state) {
          throw new Error('認証パラメータが不足しています')
        }

        // OAuth状態を検証
        if (!verifyOAuthState(state)) {
          throw new Error('不正な認証リクエストです')
        }

        // バックエンドにコードを送信してユーザー情報を取得
        const { authAPI } = await import('@/shared/api/auth')
        const authData = await authAPI.handleGoogleCallback(code, state)
        
        // 認証成功
        login(
          authData.user, 
          authData.token, 
          authData.refreshToken, 
          authData.expiresIn
        )
        setStatus('success')
        setMessage('ログインが完了しました')
        
        // 少し待ってからリダイレクト
        setTimeout(() => {
          navigate('/todo')
        }, 2000)

      } catch (error) {
        setStatus('error')
        setMessage((error as Error).message)
        
        // エラー時は5秒後にログインページにリダイレクト
        setTimeout(() => {
          navigate('/login')
        }, 5000)
      }
    }

    handleCallback()
  }, [login, navigate])

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md text-center">
          {status === 'loading' && (
            <div className="animate-fade-in">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-white mb-2">認証処理中...</h2>
              <p className="text-gray-300">しばらくお待ちください</p>
            </div>
          )}

          {status === 'success' && (
            <div className="animate-bounce-in">
              <div className="w-16 h-16 bg-green-500/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <i className="fas fa-check text-2xl text-green-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">認証成功！</h2>
              <p className="text-gray-300">{message}</p>
              <p className="text-sm text-gray-400 mt-2">自動的にリダイレクトします...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="animate-shake">
              <div className="w-16 h-16 bg-red-500/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                <i className="fas fa-exclamation-triangle text-2xl text-red-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">認証エラー</h2>
              <p className="text-gray-300 mb-4">{message}</p>
              <p className="text-sm text-gray-400">5秒後にログインページに戻ります...</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}