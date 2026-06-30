"use server";

import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createPost(slug: string, formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("posts")
    .insert({ slug, title, description });

  if (error) throw new Error(error.message);

  revalidatePath(`/${slug}`);
}