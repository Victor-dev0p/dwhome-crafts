'use client';

import AdminNav from '@/components/Admin/AdminNav';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <body>
        <AdminNav />
        {children}
      </body>
    </SessionProvider>
  );
}
