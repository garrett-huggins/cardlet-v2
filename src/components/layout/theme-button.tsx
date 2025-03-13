"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeButton() {
  const { setTheme } = useTheme();
  return (
    <Button
      className="w-full"
      variant="ghost"
      onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
    >
      Theme
      <Sun className="w-6 h-6 text-foreground dark:hidden" />
      <Moon className="w-6 h-6 dark:block hidden text-foreground" />
    </Button>
  );
}
