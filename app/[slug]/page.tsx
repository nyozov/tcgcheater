import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { PostForm } from "./post-form";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: posts } = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <PostForm slug={slug} />

      <div className="space-y-4">
        {posts?.length === 0 && (
          <p className="text-gray-500">No posts yet. Be the first.</p>
        )}
        {posts?.map((post) => (
          <div key={post.id} className="border rounded p-4">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-gray-700 mt-1">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}