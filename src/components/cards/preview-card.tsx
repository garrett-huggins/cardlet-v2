"use client";

import { Card } from "@/db/decks";
import {
  Card as CardContainer,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CardPreviewCard({ card }: { card: Card }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <CardContainer>
      <CardContent>{showAnswer ? card.answer : card.question}</CardContent>
      <CardFooter>
        <Button
          variant={showAnswer ? "default" : "secondary"}
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "Hide" : "Show"} Answer
        </Button>
      </CardFooter>
    </CardContainer>
  );
}
