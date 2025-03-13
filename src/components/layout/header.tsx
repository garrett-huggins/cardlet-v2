import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "./theme-button";
import { BookOpen } from "lucide-react";

export async function Header() {
  const user = await currentUser();

  return (
    <header className="px-2 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between mx-auto py-2">
        <Link href="/">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Cardlet</span>
          </div>
        </Link>
        <div className="items-center flex">
          {user ? (
            <nav className="flex items-center">
              <Button variant="link" asChild>
                <Link href="/decks">My Decks</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
                  <Avatar>
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      {user.firstName ? user.firstName[0] : ""}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="hover:cursor-pointer">
                    <ThemeButton />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:cursor-pointer" asChild>
                    <Link href="/user-profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:cursor-pointer w-full text-destructive-foreground"
                    asChild
                  >
                    <SignOutButton>Sign Out</SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          ) : (
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
