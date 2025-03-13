import { Card, getDeck } from "@/db/decks";
import { createClerkSupabaseClientSsr } from "@/lib/server";
import { TestDeckClient } from "@/components/decks/test-client";
import { Separator } from "@/components/ui/separator";

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array: Card[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function TestDeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const client = await createClerkSupabaseClientSsr();
  const { id } = await params;
  const deck = await getDeck({
    client,
    id: id,
  });

  if (!deck) {
    return <div>Deck not found</div>;
  }

  const shuffledCards = shuffleArray(deck.cards);

  return (
    <>
      <div className="mb-4 space-y-2">
        <h1 className="text-center text-4xl font-bold">{deck.name}</h1>
        <h2 className="text-center text-2xl">{deck.course}</h2>
      </div>
      <Separator className="my-4" />
      <TestDeckClient cards={shuffledCards} />
    </>
  );
}
