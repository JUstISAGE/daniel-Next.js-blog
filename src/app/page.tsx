'use client';
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const startLogin = () => {
    setShowLogin(true)
  };

  const startSignin = () => {
    setShowSignin(true)
  };



  return (
    <div className="h-full bg-cover bg-center bg-no-repeat text-center " >
      <h1 className="font-serif text-5xl text-black text-center mt-8" >
        Where Every Blog Begins
      </h1>
      <button
        onClick={()=>{startLogin()}}
        className="border border-gray-700 rounded-lg bg-blue-300 font-serif text-black font-bold w-80 h-14 mt-8 hover:underline"
      >
        Log in
      </button>
      <button
        onClick={()=>{startSignin()}}
        className="border border-gray-700 rounded-lg bg-blue-300 font-serif text-black font-bold w-80 h-14 mt-8 hover:underline"
      >
        Sign up
      </button>
      {showLogin && (
       <div className="fixed inset-0 flex justify-center items-center z-50" id="login-modal">
          <div className="bg-white border border-gray-800 rounded-lg w-1/2 p-8 text-black">
            <h2 className="text-2xl font-serif mb-4">Log in</h2>
            <div>
              <label className="block mb-2 font-serif">User name:</label>
              <input type="text" id="username" name="username" className="w-full border border-gray-300 p-2 rounded mb-4" value={username} onChange={(e) => setUsername(e.target.value)}/>

              <label className="block mb-2 font-serif">Password:</label>
              <input type="text" id="password" name="password" className="w-full border border-gray-300 p-2 rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)}/>

              <Link href={{ pathname: '/post', query: { username, password, mode: 'l' } }}
              className="font-serif text-black hover:underline">
               Login
              </Link>
            </div>
          </div>
        </div>
      )}
      {showSignin && (
       <div className="fixed inset-0 flex justify-center items-center z-50" id="login-modal">
          <div className="bg-white border border-gray-800 rounded-lg w-1/2 p-8 text-black">
            <h2 className="text-2xl font-serif mb-4">Sign up</h2>
            <div>
              <label className="block mb-2 font-serif">User name:</label>
              <input type="text" id="username" name="username" className="w-full border border-gray-300 p-2 rounded mb-4" value={username} onChange={(e) => setUsername(e.target.value)}/>

              <label className="block mb-2 font-serif">Password:</label>
              <input type="text" id="password" name="password" className="w-full border border-gray-300 p-2 rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)}/>

              <Link href={{ pathname: '/post', query: { username, password, mode: 's'} }}
              className="font-serif text-black hover:underline">
               Sign up
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <div className="w-1/2 bg-white border border-gray-700 rounded-lg p-6">
          <h2 className="font-serif text-black mb-2 font-semibold">A brief introduction about me</h2>
          <p className="font-serif text-black"><strong>By:</strong> Shuhan Lyu</p>
          <p className="font-serif text-black">
            I am a fourth year undergraduate studying at the University of California,
            Santa Barbara. I major in both mathematics and computer science. I have a
            keen interest in areas such as cryptography, network security, and web development.
            At university, I systematically studied algorithms, object-oriented programming, web development,
            and machine learning. These courses helped me build a solid theoretical foundation and develop
            my ability to solve real-world problems. I have also self-studied some knowledge in network security,
            including SQL injection and intercepting communication.
          </p>
        </div>
      </div>
    </div>
  )
}

