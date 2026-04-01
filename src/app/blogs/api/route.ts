import { blogData } from "@/src/utils/constant";
import { writeFile } from "fs/promises";
import path from "path";

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
  const blog = await request.formData();


  const title = blog.get("title") as string;
  const content = blog.get("content") as string;
  const image = blog.get("image") as File;

  let imagePath = "";

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${image.name}`;

    await writeFile(
      path.join(process.cwd(), "public/uploads", fileName),
      buffer,
    );

    imagePath = `/uploads/${fileName}`;
  }

  const newBlog = {
    id: String(blogData.length + 1),
    title: title,
    content: content,
    image: imagePath,
  };

  blogData.push(newBlog);

  return new Response(JSON.stringify(newBlog), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function PATCH(request: Request) {
  const blog = await request.formData();

  const id = blog.get("id") as string;
  const title = blog.get("title") as string;
  const content = blog.get("content") as string;
  const image = blog.get("image") as File;

  const blogIndex = blogData.findIndex((b: any) => b.id === id);

  if (blogIndex === -1) {
    return new Response(JSON.stringify({ error: "Blog not found" }), {
      status: 404,
    });
  }

  if (title) blogData[blogIndex].title = title;
  if (content) blogData[blogIndex].content = content;

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${image.name}`;

    await writeFile(
      path.join(process.cwd(), "public/uploads", fileName),
      buffer,
    );

    blogData[blogIndex].image = `/uploads/${fileName}`;
  }

  return new Response(JSON.stringify(blogData[blogIndex]), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const blogIndex = blogData.findIndex((b: any) => b.id === id);

  if (blogIndex === -1) {
    return new Response(JSON.stringify({ error: "Blog not found" }), {
      status: 404,
    });
  }

  const deletedBlog = blogData.splice(blogIndex, 1);

  return new Response(JSON.stringify(blogData), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
