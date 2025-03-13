import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Share2,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-2">
        <section className="py-20 md:py-28">
          <div className="container flex mx-auto flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master Any Subject with{" "}
              <span className="text-primary">Flashcards</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground">
              Create, study, and share flashcards to improve your learning.
              Track your progress and ace your exams with Cardlet.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/decks">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline">
                Explore Decks
              </Button> */}
            </div>
            {/* <div className="mt-16 relative w-full max-w-5xl">
              <div className="rounded-lg border bg-background shadow-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Cardlet dashboard preview"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:bottom-10 md:right-10 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <p className="text-sm md:text-base font-medium">
                  Join 50,000+ students already learning with Cardlet
                </p>
              </div>
            </div> */}
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need to Study Smarter
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Cardlet provides powerful tools to help you learn efficiently
                and effectively.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Create Custom Decks"
                description="Build personalized flashcard decks for any subject or course. Add text, images, and more."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="Smart Study Modes"
                description="Test yourself with different study modes designed to help you memorize and understand concepts."
              />
              <FeatureCard
                icon={<Share2 className="h-10 w-10 text-primary" />}
                title="Share & Collaborate"
                description="Share your decks with friends or discover decks created by other students."
              />
              <FeatureCard
                icon={<Trophy className="h-10 w-10 text-primary" />}
                title="Track Progress"
                description="Monitor your learning progress with detailed statistics and performance insights."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Study Groups"
                description="Form study groups to collaborate on decks and quiz each other for better retention."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Spaced Repetition"
                description="Our algorithm focuses on the cards you find most difficult, optimizing your study time."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                How Cardlet Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Start learning in minutes with our simple three-step process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Create or Find Decks"
                description="Create your own flashcard decks or browse our library of user-created content."
              />
              <StepCard
                number="2"
                title="Study Your Way"
                description="Choose from multiple study modes: flashcards, multiple choice, written answers, and more."
              />
              <StepCard
                number="3"
                title="Track & Improve"
                description="Review your performance stats and focus on areas that need improvement."
              />
            </div>
            {/* <div className="mt-16 text-center">
              <Button size="lg" className="gap-2">
                Start Learning Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Boost Your Learning?
            </h2>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands of students who are already studying smarter with
              Cardlet.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-10 gap-2"
            >
              <Link href="/decks">
                Get Started for Free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-10 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Cardlet</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Help Center
              </Link>
              <Link href="#" className="hover:text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cardlet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
};

function FeatureCard({
  icon,
  title,
  description,
}: CardProps & { icon: React.ReactNode }) {
  return (
    <div className="bg-background rounded-lg border p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: CardProps & { number: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
