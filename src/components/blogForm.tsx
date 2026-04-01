"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { InputField } from "./inputField";
import { Button } from "./ui/button";

interface BlogFormProps {
  title?: string;
  content?: string;
  id?: string;
  image?: File | null;
  isEdit?: boolean;
}

const BlogForm = ({
  title = "",
  content = "",
  id,
  image = null,
  isEdit = false,
}: BlogFormProps) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title,
      content,
      image: image || null,
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const method = isEdit ? "PATCH" : "POST";

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      if (values.image) {
        formData.append("image", values.image);
      }

      if (isEdit && id) {
        formData.append("id", id);
      }

      try {
        const res = await fetch("/blogs/api", {
          method,
          body: formData,
        });

        if (res.ok) {
          if (!isEdit) resetForm();
          router.push("/blogs");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Edit Blog" : "Create Blog"}
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <InputField
          label="Title"
          name="title"
          placeholder="Enter blog title"
          required={true}
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <InputField
          label="Blog Image"
          name="image"
          type="file"
          accept="image/*"
          required={false}
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            formik.setFieldValue("image", file);
          }}
        />

        <InputField
          label="Content"
          name="content"
          placeholder="Enter blog content"
          required={true}
          textarea={true}
          value={formik.values.content}
          onChange={formik.handleChange}
        />

        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Blog"
              : "Create Blog"}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;