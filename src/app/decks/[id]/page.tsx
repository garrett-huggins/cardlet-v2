import { createClerkSupabaseClientSsr } from "@/lib/server";
import { redirect } from "next/navigation";
import { getDeck } from "@/db/decks";
import { CardPreviewClient } from "@/components/cards/preview-client";

interface Params {
  id: string;
}

export default async function DeckPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const client = await createClerkSupabaseClientSsr();
  const deck = await getDeck({
    client,
    id,
  });

  if (!deck) {
    redirect("/decks");
  }

  return (
    <>
      <div className="pb-4">
        <h1 className="text-center">{deck.name}</h1>
        <h2 className="text-center text-muted-foreground">{deck.course}</h2>
      </div>
      <CardPreviewClient id={id} deck={deck} />
    </>
  );
}
