"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

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
      <Button onClick={handleDelete}>
        Delete Blog
      </Button>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default DeleteBlogButton;