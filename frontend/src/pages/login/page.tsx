'use client';

import { AuthLayout } from '@/features/auth/ui/AuthLayout';
import { GoogleLoginButton } from '@/features/auth/ui/GoogleLoginButton';

export default function LoginPage() {
  return (
    <AuthLayout>
      <GoogleLoginButton />
    </AuthLayout>
  );
}
