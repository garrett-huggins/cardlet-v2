"use client";

import { useState } from "react";
import { TestCard } from "@/components/cards/test-card";
import { Card } from "@/db/decks";

export function TestDeckClient({ cards }: { cards: Card[] }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    setScores((prevScores) => [...prevScores, isCorrect ? 1 : 0]);

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const totalScore = scores.reduce((sum, score) => sum + score, 0);

  if (isComplete) {
    return (
      <div className="text-center">
        <p className="text-2xl">Test complete!</p>
        <p>
          Your score: {totalScore} / {cards.length}
        </p>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="text-center space-y-2">
      <p>
        Card {currentCardIndex + 1} of {cards.length}
      </p>
      <TestCard
        card={currentCard}
        isComplete={isComplete}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
