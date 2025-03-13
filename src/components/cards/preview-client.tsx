"use client";

import { useState } from "react";
import { DeckDto } from "@/db/decks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutGrid, Columns2, Columns3, Columns4 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardPreviewCard } from "@/components/cards/preview-card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteDeck } from "@/db/decks";
import { useSession } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { toast } from "sonner";

type CardPreviewProps = {
  id: string;
  deck: DeckDto;
};

export function CardPreviewClient({ id, deck }: CardPreviewProps) {
  const [gridView, setGridView] = useState<1 | 2 | 3>(3);

  const gridClass =
    gridView === 1
      ? "md:grid-cols-1"
      : gridView === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });
            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  const client = createClerkSupabaseClient();

  const handleDelete = async () => {
    await deleteDeck({ client, id });
    toast.success("Deck deleted");
    redirect("/decks");
  };

  return (
    <>
      <div className="flex justify-between">
        <Button asChild>
          <Link href={`/decks/${id}/test`}>Test Yourself</Link>
        </Button>
        <div className="flex space-x-2">
          <DeleteDeckDialog handleDelete={handleDelete} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="hidden md:flex">
                <LayoutGrid />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setGridView(1)}>
                Small <Columns2 />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setGridView(2)}>
                Medium <Columns3 />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setGridView(3)}>
                Large <Columns4 />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="my-4" />
      <div className={"grid gap-4 grid-cols-1 " + gridClass}>
        {deck.cards.map((card, idx) => {
          return <CardPreviewCard key={idx} card={card} />;
        })}
      </div>
    </>
  );
}

const DeleteDeckDialog = ({ handleDelete }: { handleDelete: () => void }) => {
  return (
    <AlertDialog>
      <Button asChild variant="destructive">
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            deck.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} asChild variant="destructive">
            <AlertDialogAction>Delete</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
