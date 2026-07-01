import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getGithubData } from "@/lib/github.functions";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Stack } from "@/components/portfolio/Stack";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const ghQuery = queryOptions({
  queryKey: ["github", "sabastine4u"],
  queryFn: () => getGithubData(),
  staleTime: 1000 * 60 * 10,
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(ghQuery),
  component: HomePage,
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Something didn't load</h1>
        <p className="text-muted-foreground mt-2 text-sm">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  ),
  notFoundComponent: () => <div className="p-10">Not found</div>,
});

function HomePage() {
  const { data } = useSuspenseQuery(ghQuery);
  const { repos, languages, totalStars, profile } = data;

  return (
    <div className="dark min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <main>
        <Hero
          stars={totalStars}
          repoCount={profile?.publicRepos ?? repos.length}
          followers={profile?.followers ?? 0}
        />
        <About />
        <Projects repos={repos} />
        <Stack languages={languages} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
