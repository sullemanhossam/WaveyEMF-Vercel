import { Navigation } from './navigation';
import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />

      <div className="container m-auto p-4">{children}</div>
    </>
  );
}
