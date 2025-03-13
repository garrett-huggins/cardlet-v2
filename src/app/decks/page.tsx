import { createClerkSupabaseClientSsr } from "@/lib/server";
import { auth } from "@clerk/nextjs/server";
import { getUserDecks } from "@/db/decks";
import { getUsersCourses } from "@/db/user";
import { DeckPreviewClient } from "@/components/decks/preview-client";

export default async function UserDecks() {
  const client = await createClerkSupabaseClientSsr();
  const { userId } = await auth();
  const decks = await getUserDecks({
    client,
    userId,
  });
  const courses = await getUsersCourses({
    client,
    userId,
  });

  // group decks by course
  const decksByCourse = courses.map((course) => {
    return {
      course,
      decks: decks.filter((deck) => deck.course === course),
    };
  });

  const noCourseDecks = decks.filter((deck) => !deck.course);

  return (
    <>
      <div className="mb-4">
        <p className="text-center text-xl">
          Here are all the decks you have created
        </p>
        <p className="text-center text-muted-foreground">Happy studying!</p>
      </div>
      <DeckPreviewClient
        courses={courses}
        decksByCourse={decksByCourse}
        noCourseDecks={noCourseDecks}
      />
    </>
  );
}
