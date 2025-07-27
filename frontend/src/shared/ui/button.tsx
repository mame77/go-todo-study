import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'github' | 'google' | 'demo'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/30',
  github: 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 hover:border-gray-600',
  google: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200',
  demo: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl group'
  const widthStyle = fullWidth ? 'w-full' : ''
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}