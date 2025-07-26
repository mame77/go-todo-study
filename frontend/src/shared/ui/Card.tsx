import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  const baseStyles = 'bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20'
  
  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  )
}