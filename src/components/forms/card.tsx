"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card as CardContainer, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const Card = z.object({
  question: z.string().nonempty({
    message: "Question cannot be empty",
  }),
  answer: z.string().nonempty({
    message: "Answer cannot be empty",
  }),
});

export function CardForm({
  error,
  addCard,
}: {
  error: boolean;
  addCard: (card: z.infer<typeof Card>) => void;
}) {
  const form = useForm<z.infer<typeof Card>>({
    resolver: zodResolver(Card),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof Card>) {
    addCard(values);
    form.resetField("question");
    form.resetField("answer");
  }

  return (
    <Form {...form}>
      <CardContainer className={error ? "border border-destructive" : ""}>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Card</Button>
          </form>
        </CardContent>
      </CardContainer>
    </Form>
  );
}
