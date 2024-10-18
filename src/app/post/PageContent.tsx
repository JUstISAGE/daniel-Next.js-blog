'use client';

import { useSearchParams } from 'next/navigation';

// This is a client component.
export default function PageContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  return (
    <div>
      <h1 className="text-4xl text-black">Hello, {username}!</h1>
    </div>
  );
}
