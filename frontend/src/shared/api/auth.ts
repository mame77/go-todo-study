import { User } from '@/shared/lib/types'

const API_BASE_URL = 'http://localhost:8080/api'

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn?: number
}

export const authAPI = {
  // Google認証URLを取得
  async getGoogleAuthURL(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/google/auth`)
    if (!response.ok) {
      throw new Error('認証URL取得に失敗しました')
    }
    const data = await response.json()
    return data.url
  },

  // Google認証コールバック処理
  async handleGoogleCallback(code: string, state: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/google/redirect?code=${code}&state=${state}`)
    if (!response.ok) {
      throw new Error('認証の完了に失敗しました')
    }
    return response.json()
  },

  // 認証状態を確認
  async verifyToken(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('トークン検証に失敗しました')
    }
    return response.json()
  },

  // トークンリフレッシュ
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    })
    if (!response.ok) {
      throw new Error('トークンリフレッシュに失敗しました')
    }
    return response.json()
  },

  // ログアウト
  async logout(token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('ログアウトに失敗しました')
    }
  }
}