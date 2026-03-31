"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            setMessage("Please fill in both fields.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/api`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                setMessage("Blog created successfully! Redirecting...");
                setTitle("");
                setContent("");
                setTimeout(() => {
                    router.push("/blogs");
                }, 1500);
            } else {
                setMessage("Failed to create blog.");
            }
        } catch (err) {
            setMessage("Error creating blog.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    Create New Blog
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {message && (
                        <p className="text-center text-blue-600 font-semibold">{message}</p>
                    )}

                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700 font-medium">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter blog content"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 h-56 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-transform shadow-lg"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </div>
    );
}

export default page