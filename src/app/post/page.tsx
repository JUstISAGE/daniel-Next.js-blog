'use client'
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    return <h1 className={"text-4xl text-black"}>Hello, {username}!</h1>
}