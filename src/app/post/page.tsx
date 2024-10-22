'use server'
import prisma from '../../../lib/prisma';
import CreateBlog from './CreateBlog';
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: { username: string, password: string, mode: string } }) {
  const { username, password, mode } = searchParams;
  
  
  if (!prisma){
    throw new Error("Prisma fails");
  }
  const account = await prisma.accounts.findUnique({
    where: {username},
  });
  const bloglist:React.ReactNode[] = [];
  if(mode == 'l'){
    if(!account){
      return (<div className="fixed inset-0 flex justify-center items-center z-50" id="login-modal">
      <div className="bg-white border border-gray-800 rounded-lg w-1/2 p-8 text-black">
        <h2 className="text-2xl font-serif mb-4">Username invalid</h2>
        <Link href={{ pathname: '/'}}>
         Go back to login
        </Link>
      </div>
    </div>)
    }
    if(account.password != password){
      return (<div className="fixed inset-0 flex justify-center items-center z-50" id="login-modal">
        <div className="bg-white border border-gray-800 rounded-lg w-1/2 p-8 text-black">
          <h2 className="text-2xl font-serif mb-4">Password invalid</h2>
          <Link href={{ pathname: '/'}}>
           Go back to login
          </Link>
        </div>
      </div>)
    }
    const user = await prisma.posts.findMany({
      where: { username }, 
    });
    if(user.length == 0){
      return <NoBlogs username={username} />;
    }
    else{
      user.forEach(i => {
        if(i.blogcontent != ""){
          bloglist.push(
            <li key={i.id} className="w-full font-serif text-black mb-8">
              <div className="mt-10 flex justify-center">
                <div className="w-1/2 bg-white border border-gray-700 rounded-lg p-6">
                  <h2 className="font-serif text-black mb-2 font-semibold">{i.blogtitle}</h2>
                  <p className="font-serif text-black"><strong>By:</strong> {i.username}</p>
                  <p className="font-serif text-black">
                    {i.blogcontent}
                  </p>
                </div>
              </div>
            </li>
          )
        }
      });
    }
  }
  if(mode == 's'){
    if(account){
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
    await prisma.accounts.create({
      data: {
        username: username,
        password: password
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
        <Link href={{ pathname: '/post', query: { username, password, mode: 'l'} }}
        className="font-serif text-black hover:underline">
          Go to your homepage
        </Link>
      </div>
    )
  }
  return (
    <div>
      {bloglist}
      <CreateBlog username={username} />
    </div>
  );
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