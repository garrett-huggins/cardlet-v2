"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createDeck } from "@/db/decks";
import { useState, useEffect } from "react";
import { CardForm } from "./card";
import {
  Card as CardContainer,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

const Card = z.object({
  question: z.string().nonempty({
    message: "Question cannot be empty",
  }),
  answer: z.string().nonempty({
    message: "Answer cannot be empty",
  }),
});

const Deck = z.object({
  name: z.string().nonempty({
    message: "Name cannot be empty",
  }),
  course: z.string().optional(),
  cards: z.array(Card).min(1, {
    message: "Deck must have at least one card",
  }),
});

export function CreateDeckForm({ client }: { client: SupabaseClient }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewCards, setPreviewCards] = useState(false);
  const handlePreview = () => setPreviewCards((prev) => !prev);

  // TODO: Implement course selection
  // const [enableCourseInput, setEnableCourseInput] = useState(false);
  // const { isLoaded, userId } = useAuth();
  // const [courses, setCourses] = useState<string[]>([]);

  const [cards, setCards] = useState<z.infer<typeof Card>[]>([]);
  const addCard = (card: z.infer<typeof Card>) => {
    setCards((prev) => {
      const updatedCards = [...prev, card];
      form.setValue("cards", updatedCards); // Sync with form state
      if (form.formState.errors.cards) {
        form.clearErrors("cards"); // Clear validation error if present
      }
      return updatedCards;
    });
  };

  const form = useForm<z.infer<typeof Deck>>({
    resolver: zodResolver(Deck),
    defaultValues: {
      name: "",
      course: "",
      cards: [],
    },
  });

  async function onSubmit(values: z.infer<typeof Deck>) {
    console.log(values);
    await createDeck({
      client,
      deck: {
        name: values.name,
        course: values.course,
        cards: values.cards,
      },
    });
  }

  // useEffect(() => {
  //   if (isLoaded && userId) {
  //     async function fetchCourses() {
  //       if (userId) {
  //         const decks = await getUserDecks({ client, userId });
  //         // set courses to array of each unique course found
  //         const courses = Array.from(
  //           new Set(decks.map((deck) => deck.course))
  //         ).filter((course): course is string => course !== undefined);
  //         setCourses(courses);
  //       }
  //     }
  //     fetchCourses();
  //   }
  // }, [isLoaded, userId, client]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      toast.success("Deck created");
      redirect("/decks");
    }
    if (form.formState.isSubmitting) {
      setIsSubmitting(true);
    }
    if (!form.formState.isSubmitting && isSubmitting) {
      setIsSubmitting(false);
    }
  }, [
    form.formState.isSubmitting,
    isSubmitting,
    form.formState.isSubmitSuccessful,
  ]);

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="py-8 space-y-4">
        {/* Missing cards error */}
        {form.formState.errors.cards && (
          <p className="text-red-500">{form.formState.errors.cards.message}</p>
        )}

        <CardForm
          error={form.formState.errors.cards ? true : false}
          addCard={addCard}
        />
        <div className="flex items-center gap-2">
          <p>Cards: {cards.length}</p>
          <Button variant="ghost" onClick={handlePreview}>
            {previewCards ? "Hide" : "Preview"} Cards
          </Button>
        </div>
        {previewCards && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <CardPreview key={index} card={card} />
            ))}
          </div>
        )}
      </div>
      <Button disabled={isSubmitting} onClick={form.handleSubmit(onSubmit)}>
        Create Deck
      </Button>
    </>
  );
}

const CardPreview = ({ card }: { card: z.infer<typeof Card> }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <CardContainer>
      <CardContent>
        {isFlipped ? <p>{card.answer}</p> : <p>{card.question}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsFlipped((prev) => !prev)}>a</Button>
      </CardFooter>
    </CardContainer>
  );
};
