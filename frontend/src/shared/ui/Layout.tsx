import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  withBackground?: boolean
}

export default function Layout({ children, withBackground = true }: LayoutProps) {
  const backgroundStyles = withBackground ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen' : ''
  
  return (
    <div className={backgroundStyles}>
      {withBackground && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-10 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}