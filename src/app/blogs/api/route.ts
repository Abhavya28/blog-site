import { blogData } from "@/src/utils/constant";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const blog = blogData.find((b: any) => b.id === id);
    if (blog) {
      return new Response(JSON.stringify(blog));
    } else {
      return new Response(JSON.stringify({}));
    }
  }

  // All Blogs
  return new Response(JSON.stringify(blogData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
