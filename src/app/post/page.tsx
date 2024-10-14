'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import prisma from '../../../lib/prisma';


function PageContent() {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    return <h1 className="text-4xl text-black">Hello, {username}!</h1>;
}

export default function Page() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <PageContent />
        </Suspense>
    );
}