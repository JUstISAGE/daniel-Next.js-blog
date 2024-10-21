'use server'
import prisma from '../../../lib/prisma';
import CreateBlog from './CreateBlog';
import Link from "next/link";

// This is a server component.
// `searchParams` is available from Next.js directly in the component signature.
export default async function Page({ searchParams }: { searchParams: { username: string, password: string, mode: string } }) {
  // Extract the username from the search params
  const { username, password, mode } = searchParams;
  
  // Example Prisma query (modify based on your schema)
  if (!prisma){
    throw new Error("Prisma fails");
  }
  const user = await prisma.posts.findMany({
    where: { username }, // Use the actual username from searchParams
  });
  const bloglist:React.ReactNode[] = [];
  if(mode == 'l'){
    if(user.length == 1){
      return <NoBlogs username={username} />;
    }
    else{
      user.forEach(i => {
        if(i.blogcontent != ""){
          bloglist.push(<li key={i.id} className="mb-4">
            <h2 className="text-xl font-bold">{i.blogtitle}</h2>
            <p>{i.blogcontent}</p>
            <p className="text-sm text-gray-600">Posted by: {i.username}</p>
          </li>)
        }
      });
    }
  }
  if(mode == 's'){
    if(user.length != 0){
      return (<div className="fixed inset-0 flex justify-center items-center z-50" id="login-modal">
        <div className="bg-white border border-gray-800 rounded-lg w-1/2 p-8 text-black">
          <h2 className="text-2xl font-serif mb-4">Username Already Registered</h2>
          <p className="mb-4">The username <strong>{username}</strong> has already been registered. Do you want to log in instead?</p>
          <Link href={{ pathname: '/'}}>
           Go back to login
          </Link>
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
        <Link href={{ pathname: '/post', query: { username, password, mode: 'l'} }}>
          Go to your homepage
        </Link>
      </div>
    )
  }
  return (
    <div>
      <ul>{bloglist}</ul>
      <CreateBlog username={username} />
    </div>
  );
}

export async function createBlogPost(username: string, author: string, content: string) {
  console.log("z")
  await prisma.posts.create({
    data: {
      username: username,
      blogtitle: author,
      blogcontent: content,
    },
  });
}


function NoBlogs({ username }: { username: string }) {
  return (
    <div className="h-full bg-cover bg-center bg-no-repeat text-center">
      <h1 className="font-serif text-5xl text-black text-center mt-8">
        You haven&#39;t posted anything yet.
      </h1>
      <CreateBlog username={username} />
    </div>
  );
}