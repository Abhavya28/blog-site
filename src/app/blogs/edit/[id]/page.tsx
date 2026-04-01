import BlogForm from "@/src/components/blogForm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/api?id=${id}`,
    {
      cache: "no-store",
    }
  );

  const blog = await res.json();

  console.log(blog, "blog");

  if (!blog || !blog.id) {
    return <div>Blog not found</div>;
  }
  return (
    <BlogForm
      id={blog.id}
      isEdit={true}
      title={blog.title}
      content={blog.content}
    />
  );
};

export default page;