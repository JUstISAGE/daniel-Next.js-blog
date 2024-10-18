import { Suspense } from 'react';
import prisma from '../../../lib/prisma';
import PageContent from './PageContent';

// This is a server component.
// `searchParams` is available from Next.js directly in the component signature.
export default async function Page({ searchParams }: { searchParams: { username: string, mode: string } }) {
  // Extract the username from the search params
  const { username, mode } = searchParams;
  // Example Prisma query (modify based on your schema)
  if (!prisma){
    throw new Error("Prisma fails");
  }
  const user = await prisma.posts.findMany({
    where: { username }, // Use the actual username from searchParams
  });
  if(mode == 'l'){
    const bloglist:React.ReactNode[] = [];
    if(user.length == 1){
      return (
        <div className="h-full bg-cover bg-center bg-no-repeat text-center">
        <h1 className="font-serif text-5xl text-black text-center mt-8">
          You haven&#39;t posted anything yet.
        </h1>
        <p className="font-serif text-2xl text-black text-center mt-4">
          Create your first blog.
        </p>
      </div>
      )
    }
    user.forEach(i => {
      if(i.blogcontent != ""){
        bloglist.push(<li key={i.id} className="mb-4">
          <h2 className="text-xl font-bold">{i.blogtitle}</h2>
          <p>{i.blogcontent}</p>
          <p className="text-sm text-gray-600">Posted by: {i.username}</p>
        </li>)
      }
    });
    return (
      <div>
        <h1 className="text-2xl">Server-side Fetched User:</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Suspense fallback={<h1>Loading...</h1>}>
          {/* Render the client-side component */}
          <PageContent />
          <ul>{bloglist}</ul>
        </Suspense>
      </div>
    );
  }
  if(mode == 's'){
    if(user.length != 0){
      return (<div className="fixed inset-0 flex justify-center items-center z-50" id="login-modal">
        <div className="bg-white border border-gray-800 rounded-lg w-1/2 p-8 text-black">
          <h2 className="text-2xl font-serif mb-4">Username Already Registered</h2>
          <p className="mb-4">The username <strong>{username}</strong> has already been registered. Do you want to log in instead?</p>
        </div>
      </div>)
    }
    await prisma.posts.create({
      data: {
        username: username,
        blogtitle: "",
        blogcontent: "",
      },
    });
    return (
      <div className="h-full bg-cover bg-center bg-no-repeat text-center">
        <h1 className="font-serif text-5xl text-black text-center mt-8">
          Account Created Successfully!
        </h1>
        <p className="font-serif text-2xl text-black text-center mt-4">
          Your username has been created.
        </p>
      </div>
    )
  }
}
