import BlogCard from '@/src/components/blogCard';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/api`, {
    cache: 'no-store',
  });
  const blogs = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 items">
      <div className='flex flex-col items-center'>
        <div className='flex flex-col mb-6'>

          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">All Blogs</h1>
          <p className="text-center text-gray-600 mb-10">
            Explore all the latest articles and tutorials on web development, programming, and tech.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog: any) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
              />
            ))}
          </div>
        </div>



        <Link
          href="/blogs/create"
          className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Create Blog
        </Link>
      </div>
    </div>
  );
};

export default page;