import { blogData } from "@/src/utils/constant";

export async function GET(){
    return new Response(JSON.stringify(blogData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}