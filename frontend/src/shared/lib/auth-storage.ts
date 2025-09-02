import { AuthState, User } from './types'

const AUTH_STORAGE_KEY = 'auth_state'
const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000 // 5分のバッファ

// 認証状態をローカルストレージに保存
export const saveAuthState = (authState: AuthState): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState))
  } catch (error) {
    console.error('認証状態の保存に失敗しました:', error)
  }
}

// 認証状態をローカルストレージから取得
export const loadAuthState = (): AuthState | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) return null
    
    const authState: AuthState = JSON.parse(stored)
    
    // トークンの有効期限をチェック
    if (authState.expiresAt && Date.now() >= authState.expiresAt - TOKEN_EXPIRY_BUFFER) {
      // 期限切れの場合は削除
      clearAuthState()
      return null
    }
    
    return authState
  } catch (error) {
    console.error('認証状態の読み込みに失敗しました:', error)
    clearAuthState()
    return null
  }
}

// 認証状態をクリア
export const clearAuthState = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem('oauth_state')
    localStorage.removeItem('todos')
  } catch (error) {
    console.error('認証状態のクリアに失敗しました:', error)
  }
}

// トークンの有効期限をチェック
export const isTokenValid = (authState: AuthState | null): boolean => {
  if (!authState || !authState.token || !authState.expiresAt) {
    return false
  }
  
  return Date.now() < authState.expiresAt - TOKEN_EXPIRY_BUFFER
}

// 初期認証状態を作成
export const createAuthState = (
  user: User, 
  token: string, 
  refreshToken?: string,
  expiresIn: number = 3600 // デフォルト1時間
): AuthState => {
  return {
    user,
    token,
    refreshToken: refreshToken || null,
    isAuthenticated: true,
    expiresAt: Date.now() + (expiresIn * 1000)
  }
}

// 空の認証状態を作成
export const createEmptyAuthState = (): AuthState => {
  return {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    expiresAt: null
  }
}