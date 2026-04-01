import Link from "next/link";

interface BlogCardProps {
    id: string;
    title: string;
    content: string;
    image: File;
}

export default function BlogCard({ id, title, content, image }: BlogCardProps) {
    return (
        <Link
            href={`/blogs/${id}`}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg border border-gray-200 transition flex flex-col justify-between"
        >
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">
                    {title}
                </h2>
                <img
                    src={image || "/default-blog.jpg"}
                    alt={title}
                    width={500}
                    height={300}
                />
                <p className="text-gray-600">
                    {content?.split(" ").slice(0, 16).join(" ") || ""}...
                </p>
            </div>
            <p className="text-blue-600">Read More</p>
        </Link>
    );
}