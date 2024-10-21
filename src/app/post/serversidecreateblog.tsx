'use server';
import prisma from '../../../lib/prisma';



export async function createBlogPost(username: string, author: string, content: string) {

  await prisma.posts.create({
    data: {
      username: username,
      blogtitle: author,
      blogcontent: content,
    },
  });
}