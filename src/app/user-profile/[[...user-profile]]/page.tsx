import { UserProfile } from "@clerk/nextjs";

export default function Profile() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <UserProfile />
    </main>
  );
}
