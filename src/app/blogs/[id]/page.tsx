import Link from 'next/link';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/api?id=${id}`);
    const blog = await res.json()
    console.log(blog, "blog");
    if (!blog || !blog.id) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">

            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog #{id}</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{blog.title}</h2>
                <hr className="border-gray-300 mb-6" />

                <p className="text-gray-600 text-lg leading-relaxed">{blog.content}</p>
            </div>

            <div className="mt-8 text-center">
                <Link
                    href={`/blogs/edit/${blog.id}`}
                    className="mt-6 inline-block bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
                >
                    Edit Blog
                </Link>

                <Link
                    href={"/blogs"}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow"
                >
                    View All Blogs
                </Link>
            </div>
        </div>
    )
}

export default page

