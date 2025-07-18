
// src/features/auth/ui/GoogleLoginButton.tsx
'use client'

import { cn } from '@/shared/lib/utils'

interface GoogleLoginButtonProps {
  onClick?: () => void
}

export function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm',
        'flex items-center justify-center gap-3 text-sm font-medium',
        'hover:bg-gray-50 active:scale-[0.98] transition'
      )}
    >
      <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" aria-hidden="true">
        <path fill="#4285F4" d="M533.5 278.4c0-17.6-1.6-34.7-4.6-51H272v96.7h146.6c-6.4 34.7-25.7 64.2-54.9 84.3v69h88.7c52-47.9 81.1-118.4 81.1-198z"/>
        <path fill="#34A853" d="M272 544.3c73.4 0 135.2-24.4 180.3-66.3l-88.7-69c-24.6 16.4-56 26-91.6 26-70.4 0-130-47.6-151.3-111.8h-89.3v70.2C86.7 482.5 171.2 544.3 272 544.3z"/>
        <path fill="#FBBC05" d="M120.7 323.2C114.5 306.8 111 289 111 270.7s3.5-36.1 9.7-52.5v-70.2H31.4C11.3 180.2 0 223.6 0 270.7s11.3 90.5 31.4 122.7l89.3-70.2z"/>
        <path fill="#EA4335" d="M272 107.7c39.9 0
