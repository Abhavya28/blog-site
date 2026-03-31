import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to My Blog</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/blogs"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          View Blogs
        </Link>

        <Link
          href="/post"
          className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Create Post
        </Link>
      </div>
    </div>
  );
}
