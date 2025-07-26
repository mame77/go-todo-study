import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  const baseStyles = 'px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300'
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${className} ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}