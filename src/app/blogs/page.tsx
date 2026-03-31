import React from 'react'

const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/api`);
    const blogs = await res.json()
    
  return (
    <div>
        <h1>All Blogs</h1>
        {blogs.map((blog: any) =>(
            <div key={blog.id}>
                <h1>{blog.title}</h1>
            </div>
        ))}
    </div>
  )
}

export default page