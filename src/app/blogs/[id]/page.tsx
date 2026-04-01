import BlogCard from '@/src/components/blogCard';
import DeleteBlogButton from '@/src/components/deleteBlogButton';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/api?id=${id}`);
    const blog = await res.json()
    // console.log(blog, "blog");
    if (!blog || !blog.id) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">

            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                {/* <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog #{id}</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{blog.title}</h2>
                <hr className="border-gray-300 mb-6" />

                <p className="text-gray-600 text-lg leading-relaxed">{blog.content}</p> */}

                <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    content={blog.content}
                    image={blog.image}
                />
            </div>

            <div className="mt-8 text-center flex gap-4 items-center justify-center">
                <Link
                    href={`/blogs/edit/${blog.id}`}
                >
                    <Button>Edit Blog</Button>
                </Link>

                <DeleteBlogButton id={id} />

                <Link
                    href={"/blogs"}
                >
                    <Button>View All Blogs</Button>
                </Link>
            </div>
        </div>
    )
}

export default page

