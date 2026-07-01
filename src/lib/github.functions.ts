import { createServerFn } from "@tanstack/react-start";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  topics: string[];
  updatedAt: string;
  pushedAt: string;
};

export type GithubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  htmlUrl: string;
  location: string | null;
  company: string | null;
  createdAt: string;
};

export type GithubData = {
  profile: GithubProfile | null;
  repos: Repo[];
  languages: Record<string, number>;
  totalStars: number;
  error?: string;
};

const USERNAME = "sabastine4u";

async function gh<T>(path: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "sabastine-portfolio",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status}`);
  return (await res.json()) as T;
}

export const getGithubData = createServerFn({ method: "GET" }).handler(async (): Promise<GithubData> => {
  try {
    const [profile, repos] = await Promise.all([
      gh<any>(`/users/${USERNAME}`),
      gh<any[]>(`/users/${USERNAME}/repos?per_page=100&sort=updated`),
    ]);

    const nonFork = repos.filter((r) => !r.fork);
    const cleaned: Repo[] = nonFork.map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      homepage: r.homepage && r.homepage.trim() !== "" ? r.homepage : null,
      topics: r.topics || [],
      updatedAt: r.updated_at,
      pushedAt: r.pushed_at,
    }));

    const languages: Record<string, number> = {};
    for (const r of cleaned) if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
    const totalStars = cleaned.reduce((s, r) => s + r.stars, 0);

    return {
      profile: {
        login: profile.login,
        name: profile.name,
        avatarUrl: profile.avatar_url,
        bio: profile.bio,
        followers: profile.followers,
        following: profile.following,
        publicRepos: profile.public_repos,
        htmlUrl: profile.html_url,
        location: profile.location,
        company: profile.company,
        createdAt: profile.created_at,
      },
      repos: cleaned.sort((a, b) => +new Date(b.pushedAt) - +new Date(a.pushedAt)),
      languages,
      totalStars,
    };
  } catch (e: any) {
    return { profile: null, repos: [], languages: {}, totalStars: 0, error: e?.message ?? "Failed to load GitHub data" };
  }
});
