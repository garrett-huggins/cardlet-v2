"use client";

import { Deck } from "@/db/decks";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function DeckPreviewCard({ deck }: { deck: Deck }) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/decks/${deck.id}`)}
      className="cursor-pointer hover:scale-105 transition-transform"
    >
      <CardContent>
        <CardTitle>{deck.name}</CardTitle>
        <CardDescription>{deck.course}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-muted-foreground">{deck.cards.length} cards</p>
      </CardFooter>
    </Card>
  );
}
