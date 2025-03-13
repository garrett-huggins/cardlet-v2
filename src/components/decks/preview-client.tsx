"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Deck } from "@/db/decks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { PreviewDeckCourses } from "./preview-courses";

type DeckPreviewCardProps = {
  courses: string[];
  decksByCourse: { course: string; decks: Deck[] }[];
  noCourseDecks: Deck[];
};

export function DeckPreviewClient({
  courses,
  decksByCourse,
  noCourseDecks,
}: DeckPreviewCardProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const handleCourseChange = (course: string) => {
    setSelectedCourse(course);
  };

  return (
    <>
      <div className="flex justify-between">
        <Button asChild>
          <Link href="/decks/create">Create a new deck</Link>
        </Button>
        <Select onValueChange={handleCourseChange}>
          <SelectTrigger className="hover:cursor-pointer">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">All</SelectItem>
            {courses.map((course, idx) => {
              return (
                <SelectItem value={course} key={idx}>
                  {course}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      {decksByCourse.length === 0 && noCourseDecks.length === 0 && (
        <p className="text-center text-muted-foreground">
          You have not created any decks yet
        </p>
      )}
      <PreviewDeckCourses
        course={selectedCourse}
        decksByCourse={decksByCourse}
        noCourseDecks={noCourseDecks}
      />
    </>
  );
}
