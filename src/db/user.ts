import { SupabaseClient } from "@supabase/supabase-js";

export async function getUsersCourses({
  client,
  userId,
}: {
  client: SupabaseClient;
  userId: string | null;
}): Promise<string[]> {
  if (!userId) {
    return [];
  }
  const { data, error } = await client
    .from("decks")
    .select("course")
    .eq("user_id", userId);
  if (error) {
    return [];
  }
  // return unique courses no duplicates and no empty strings
  return Array.from(new Set(data.map((deck) => deck.course).filter(Boolean)));
}
