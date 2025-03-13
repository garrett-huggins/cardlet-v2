import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TestCard({
  card,
  onAnswer,
  isComplete,
}: {
  card: { question: string; answer: string };
  onAnswer: (isCorrect: boolean) => void;
  isComplete: boolean;
}) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    setIsAnswerVisible(false);
  };

  if (isComplete) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card className="px-4">
        <CardContent className="text-lg font-bold">{card.question}</CardContent>
        {isAnswerVisible && (
          <>
            <Separator />
            <CardDescription className="text-foreground text-lg">
              {card.answer}
            </CardDescription>
          </>
        )}
      </Card>

      {!isAnswerVisible ? (
        <Button onClick={() => setIsAnswerVisible(true)}>Reveal Answer</Button>
      ) : (
        <div className="flex justify-center space-x-4">
          <Button
            className="bg-green-500 hover:bg-green-600 text-black"
            onClick={() => handleAnswer(true)}
          >
            Correct
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-black"
            onClick={() => handleAnswer(false)}
          >
            Wrong
          </Button>
        </div>
      )}
    </div>
  );
}
