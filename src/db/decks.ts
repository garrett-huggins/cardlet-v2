import { SupabaseClient } from "@supabase/supabase-js";

export type Card = {
  question: string;
  answer: string;
};

export type DeckDto = {
  name: string;
  course?: string;
  cards: Card[];
};

export type Deck = DeckDto & { id: string };

export async function getUserDecks({
  client,
  userId,
}: {
  client: SupabaseClient;
  userId: string | null;
}): Promise<Deck[]> {
  if (!userId) {
    return [];
  }

  const { data, error } = await client
    .from("decks")
    .select()
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
  return data;
}

export async function getDeck({
  client,
  id,
}: {
  client: SupabaseClient;
  id: string;
}): Promise<DeckDto | null> {
  const { data, error } = await client
    .from("decks")
    .select("name, course, cards")
    .eq("id", id);
  if (error) {
    return null;
  }
  return data[0];
}

export async function createDeck({
  client,
  deck,
}: {
  client: SupabaseClient;
  deck: DeckDto;
}): Promise<DeckDto> {
  const { data, error } = await client
    .from("decks")
    .insert(deck)
    .select("name, course, cards");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function deleteDeck({
  client,
  id,
}: {
  client: SupabaseClient;
  id: string;
}): Promise<void> {
  const { error } = await client.from("decks").delete().eq("id", id);
  if (error) {
    throw error;
  }
}
