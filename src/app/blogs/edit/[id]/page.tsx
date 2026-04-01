import EditBlogForm from "@/src/components/editBlogForm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const {id} = await params;
  return <EditBlogForm id={id} />;
};

export default page;