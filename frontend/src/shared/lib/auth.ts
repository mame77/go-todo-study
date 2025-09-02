import { authAPI } from '@/shared/api/auth'

// OAuth状態を生成してローカルストレージに保存
export const generateOAuthState = (): string => {
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  localStorage.setItem('oauth_state', state)
  return state
}

// OAuth状態を検証
export const verifyOAuthState = (receivedState: string): boolean => {
  const storedState = localStorage.getItem('oauth_state')
  return storedState === receivedState
}

// Google認証を開始
export const startGoogleAuth = async (): Promise<void> => {
  try {
    const authURL = await authAPI.getGoogleAuthURL()
    
    // 新しいウィンドウでGoogle認証を開く
    const popup = window.open(
      authURL,
      'google-auth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    )

    if (!popup) {
      throw new Error('ポップアップがブロックされました')
    }

    // ポップアップの監視
    return new Promise((resolve, reject) => {
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          // ローカルストレージから認証結果を確認
          const authResult = localStorage.getItem('auth_result')
          if (authResult) {
            localStorage.removeItem('auth_result')
            resolve()
          } else {
            reject(new Error('認証がキャンセルされました'))
          }
        }
      }, 1000)
    })
  } catch (error) {
    throw new Error('Google認証の開始に失敗しました: ' + (error as Error).message)
  }
}

// URLパラメータから認証情報を取得
export const getAuthParamsFromURL = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    code: params.get('code'),
    state: params.get('state'),
    error: params.get('error')
  }
}