
'use client'; 
import { useState } from 'react';
import { createBlogPost } from './serversidecreateblog'; 

export default function CreateBlog({ username }: {username: string}) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  const handleCreateBlog = async () => {
    try {
      await createBlogPost(username, author, content);
      setAuthor('');
      setContent('');
      setShowCreateBlog(false);

      window.location.reload();
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <div>
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setShowCreateBlog(true)}
          className="border border-gray-700 rounded-lg bg-blue-300 font-serif text-black font-bold w-80 h-14 mt-8 hover:underline"
        >
          Create a new blog
        </button>
      </div>

      {showCreateBlog && (
        <div className="fixed inset-0 flex justify-center items-center z-50" id="create-blog-modal">
          <div className="bg-white border border-gray-800 rounded-lg w-1/2 p-8 text-black">
            <h2 className="text-2xl font-serif mb-4 text-center">Write your blog</h2>
            <div>
              <label className="block mb-2 font-serif">Title:</label>
              <input
                type="text"
                id="author"
                name="author"
                className="w-full border border-gray-300 p-2 rounded mb-4"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <label className="block mb-2 font-serif">Content:</label>
              <textarea
                id="content"
                name="content"
                className="w-full border border-gray-300 p-2 rounded mb-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button
                onClick={handleCreateBlog}
                className="border border-gray-700 rounded-lg bg-blue-300 font-serif text-black font-bold w-80 h-14 mt-8 hover:underline mx-auto block"
              >
                Submit your blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

