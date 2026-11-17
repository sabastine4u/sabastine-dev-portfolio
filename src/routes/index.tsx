import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getGithubData } from "@/lib/github.functions";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { GitHubActivity } from "@/components/portfolio/GitHubActivity";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const ghQuery = queryOptions({
  queryKey: ["github", "sabastine4u"],
  queryFn: () => getGithubData(),
  staleTime: 1000 * 60 * 10,
});

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Something didn't load</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {error instanceof Error ? error.message : "Please try again."}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(ghQuery),
  head: () => ({
    meta: [
      { title: "Sabastine Aguluka Chibuike | Full-Stack Engineer" },
      {
        name: "description",
        content:
          "Explore Sabastine Aguluka Chibuike's full-stack engineering work, projects, and GitHub activity.",
      },
      { property: "og:title", content: "Sabastine Aguluka Chibuike | Full-Stack Engineer" },
      {
        property: "og:description",
        content:
          "Explore Sabastine Aguluka Chibuike's full-stack engineering work, projects, and GitHub activity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
  errorComponent: lazyRouteComponent(async () => ({ default: ErrorComponent })),
  notFoundComponent: () => <div className="p-10">Not found</div>,
});

function HomePage() {
  const { data } = useSuspenseQuery(ghQuery);
  const dataAvailable = data.status === "success";
  const repos = dataAvailable ? data.repos : [];
  const languages = dataAvailable ? data.languages : {};
  const profile = dataAvailable ? data.profile : null;
  const totalStars = dataAvailable ? data.totalStars : null;
  const contributions = dataAvailable ? data.contributions : null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <main>
        <Hero
          repoCount={profile?.publicRepos ?? (dataAvailable ? repos.length : null)}
          totalStars={totalStars}
          followers={profile?.followers ?? null}
          contributions={contributions?.totalContributions ?? null}
        />
        <Projects repos={repos} error={dataAvailable ? undefined : data.error} />

        {/* 4-column info grid */}
        <section className="py-16 md:py-20 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <About />
            <Skills />
            <Experience />
            <GitHubActivity
              dataAvailable={dataAvailable}
              languages={languages}
              repos={repos}
              contributions={contributions}
            />
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
