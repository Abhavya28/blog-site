"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteBlogButton = ({ id }: { id: string }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch("/blogs/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setMessage("Blog deleted successfully! Redirecting...");
        setTimeout(() => router.push("/blogs"), 1500);
      } else {
        setMessage("Failed to delete blog");
      }
    } catch {
      setMessage("Error deleting blog");
    }
  };

  return (
    <div className="inline-block">
      {message && <p className="text-red-500 mb-2">{message}</p>}

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Delete Blog
      </button>
    </div>
  );
};

export default DeleteBlogButton;