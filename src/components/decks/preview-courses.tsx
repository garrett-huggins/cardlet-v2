import { Separator } from "@/components/ui/separator";
import { Deck } from "@/db/decks";
import { DeckPreviewCard } from "./preview-card";

export function PreviewDeckCourses({
  course,
  decksByCourse,
  noCourseDecks,
}: {
  course: string;
  decksByCourse: { course: string; decks: Deck[] }[];
  noCourseDecks: Deck[];
}) {
  if (course === "all") {
    return (
      <>
        {noCourseDecks.length > 0 && (
          <>
            <h2 className="text-center py-2">No Course</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {noCourseDecks.map((deck, idx) => {
                return <DeckPreviewCard key={idx} deck={deck} />;
              })}
            </div>
            <Separator className="my-4" />
          </>
        )}
        {decksByCourse.map((group, idx) => {
          return (
            <div key={idx}>
              <h2 className="text-center py-2">{group.course}</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {group.decks.map((deck, idx) => {
                  return <DeckPreviewCard key={idx} deck={deck} />;
                })}
              </div>
              <Separator className="my-4" />
            </div>
          );
        })}
      </>
    );
  }

  const group = decksByCourse.find((group) => group.course === course);

  return (
    <>
      <h2 className="text-center py-2">{group?.course}</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {group?.decks.map((deck, idx) => {
          return <DeckPreviewCard key={idx} deck={deck} />;
        })}
      </div>
      <Separator className="my-4" />
    </>
  );
}
