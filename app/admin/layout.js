'use client';

import { SessionProvider } from 'next-auth/react';

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        {/* <AdminNav /> */}
        <main className="flex-1">{children}</main>
      </div>
    </SessionProvider>
  );
}
