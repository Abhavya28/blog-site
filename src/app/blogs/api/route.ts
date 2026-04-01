import { blogData } from "@/src/utils/constant";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const blog = blogData.find((b: any) => b.id === id);
    if (blog) {
      return new Response(JSON.stringify(blog), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }
  }

  // All Blogs
  return new Response(JSON.stringify(blogData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const blog = await request.json();

  const newBlog = {
    id: String(blogData.length + 1),
    title: blog.title,
    content: blog.content,
  };

  blogData.push(newBlog);

  return new Response(JSON.stringify(newBlog), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function PATCH(request: Request) {
  const { id, title, content } = await request.json();
  const blogIndex = blogData.findIndex((b: any) => b.id === id);

  if (blogIndex === -1) {
    return new Response(JSON.stringify({ error: "Blog not found" }), {
      status: 404,
    });
  }

  if(title){
    blogData[blogIndex].title = title;
  }
  if(content){
    blogData[blogIndex].content = content;
  }

  return new Response(JSON.stringify(blogData[blogIndex]), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
