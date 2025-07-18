// src/features/auth/ui/AuthLayout.tsx
import { ReactNode } from 'react';
import Image from 'next/image';
import GoogleIcon from '@/shared/assets/google-icon.svg';
import { cn } from '@/shared/lib/utils';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className={cn(
          'w-full max-w-md bg-white p-8 rounded-2xl shadow-md flex flex-col items-center text-center',
        )}
      >
        <Image src={GoogleIcon} alt="Google icon" width={48} height={48} />
        <h1 className="text-2xl font-bold mt-4">ToDoアプリへようこそ</h1>
        <p className="text-gray-500 mb-6">
          Googleアカウントでログインしてください
        </p>
        {children}
      </div>
    </div>
  );
}
