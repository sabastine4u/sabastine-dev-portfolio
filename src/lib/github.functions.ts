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

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

export type GithubContributions = {
  totalContributions: number;
  days: ContributionDay[];
  currentStreak: number;
};

export type GithubData =
  | {
      status: "success";
      profile: GithubProfile;
      repos: Repo[];
      languages: Record<string, number>;
      totalStars: number;
      contributions: GithubContributions | null;
    }
  | { status: "error"; error: string };

type GithubApiProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  location: string | null;
  company: string | null;
  created_at: string;
};

type GithubApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  html_url: string;
  homepage: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string | null;
};

const USERNAME = "sabastine4u";
const API_ORIGIN = "https://api.github.com";
const CONTRIBUTION_QUERY = `
  query PortfolioContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isGithubApiProfile(value: unknown): value is GithubApiProfile {
  return (
    isRecord(value) &&
    typeof value.login === "string" &&
    isNullableString(value.name) &&
    typeof value.avatar_url === "string" &&
    isNullableString(value.bio) &&
    typeof value.followers === "number" &&
    typeof value.following === "number" &&
    typeof value.public_repos === "number" &&
    typeof value.html_url === "string" &&
    isNullableString(value.location) &&
    isNullableString(value.company) &&
    typeof value.created_at === "string"
  );
}

function isGithubApiRepo(value: unknown): value is GithubApiRepo {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    isNullableString(value.description) &&
    isNullableString(value.language) &&
    typeof value.stargazers_count === "number" &&
    typeof value.forks_count === "number" &&
    typeof value.fork === "boolean" &&
    typeof value.html_url === "string" &&
    isNullableString(value.homepage) &&
    Array.isArray(value.topics) &&
    value.topics.every((topic) => typeof topic === "string") &&
    typeof value.updated_at === "string" &&
    isNullableString(value.pushed_at)
  );
}

function validHomepage(value: string | null): string | null {
  if (!value?.trim()) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function getNextPage(linkHeader: string | null): URL | null {
  if (!linkHeader) return null;

  const nextLink = linkHeader.split(",").find((link) => /;\s*rel="?next"?/.test(link));
  const urlText = nextLink?.match(/<([^>]+)>/)?.[1];
  if (!urlText) return null;

  const url = new URL(urlText);
  if (url.origin !== API_ORIGIN) throw new Error("GitHub returned an invalid pagination link.");
  return url;
}

async function githubRequest(url: URL, init?: RequestInit): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;
  const request = (authenticated: boolean) => {
    const headers = new Headers(init?.headers);
    headers.set("Accept", "application/vnd.github+json");
    headers.set("X-GitHub-Api-Version", "2022-11-28");
    headers.set("User-Agent", "sabastine-portfolio");
    if (authenticated && token) headers.set("Authorization", `Bearer ${token}`);
    else headers.delete("Authorization");
    return fetch(url, { ...init, headers });
  };

  let response = await request(Boolean(token));
  if (response.status === 401 && token) response = await request(false);
  if (!response.ok) throw new Error(`GitHub API returned HTTP ${response.status}.`);
  return response;
}

async function githubJson(url: URL, init?: RequestInit): Promise<unknown> {
  const response = await githubRequest(url, init);
  const payload: unknown = await response.json();
  return payload;
}

async function getPublicRepositories(): Promise<Repo[]> {
  const repos: Repo[] = [];
  const firstPage = new URL(`/users/${USERNAME}/repos`, API_ORIGIN);
  firstPage.searchParams.set("per_page", "100");
  firstPage.searchParams.set("sort", "updated");

  let page: URL | null = firstPage;
  while (page) {
    const response = await githubRequest(page);
    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) throw new Error("GitHub returned an invalid repository response.");

    for (const item of payload) {
      if (!isGithubApiRepo(item)) throw new Error("GitHub returned an invalid repository record.");
      if (item.fork) continue;

      repos.push({
        name: item.name,
        description: item.description,
        language: item.language,
        stars: item.stargazers_count,
        forks: item.forks_count,
        url: item.html_url,
        homepage: validHomepage(item.homepage),
        topics: item.topics,
        updatedAt: item.updated_at,
        pushedAt: item.pushed_at ?? item.updated_at,
      });
    }

    page = getNextPage(response.headers.get("link"));
  }

  return repos.sort(
    (a, b) => Date.parse(b.pushedAt || b.updatedAt) - Date.parse(a.pushedAt || a.updatedAt),
  );
}

function calculateCurrentStreak(days: ContributionDay[]): number {
  const orderedDays = [...days].sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date();
  const todayText = today.toISOString().slice(0, 10);
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayText = yesterday.toISOString().slice(0, 10);

  let index = orderedDays.findIndex((day) => day.date === todayText);
  if (index >= 0 && orderedDays[index]?.contributionCount === 0) index += 1;
  if (
    index < 0 ||
    (orderedDays[index]?.date !== yesterdayText && orderedDays[index]?.date !== todayText)
  ) {
    return 0;
  }

  let streak = 0;
  const expectedDate = new Date(`${orderedDays[index]?.date}T00:00:00Z`);
  for (let current = index; current < orderedDays.length; current += 1) {
    const day = orderedDays[current];
    if (!day || day.contributionCount < 1 || day.date !== expectedDate.toISOString().slice(0, 10))
      break;
    streak += 1;
    expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
  }

  return streak;
}

async function getContributions(): Promise<GithubContributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const to = new Date();
    const from = new Date(to);
    from.setUTCFullYear(from.getUTCFullYear() - 1);
    const payload = await githubJson(new URL("/graphql", API_ORIGIN), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { login: USERNAME, from: from.toISOString(), to: to.toISOString() },
      }),
    });

    if (!isRecord(payload) || !isRecord(payload.data) || !isRecord(payload.data.user)) return null;
    const collection = payload.data.user.contributionsCollection;
    if (!isRecord(collection) || !isRecord(collection.contributionCalendar)) return null;

    const calendar = collection.contributionCalendar;
    if (typeof calendar.totalContributions !== "number" || !Array.isArray(calendar.weeks))
      return null;

    const days: ContributionDay[] = [];
    for (const week of calendar.weeks) {
      if (!isRecord(week) || !Array.isArray(week.contributionDays)) return null;
      for (const day of week.contributionDays) {
        if (
          !isRecord(day) ||
          typeof day.date !== "string" ||
          typeof day.contributionCount !== "number" ||
          typeof day.contributionLevel !== "string"
        ) {
          return null;
        }
        days.push({
          date: day.date,
          contributionCount: day.contributionCount,
          contributionLevel: day.contributionLevel,
        });
      }
    }

    return {
      totalContributions: calendar.totalContributions,
      days,
      currentStreak: calculateCurrentStreak(days),
    };
  } catch {
    return null;
  }
}

export const getGithubData = createServerFn({ method: "GET" }).handler(
  async (): Promise<GithubData> => {
    try {
      const profileUrl = new URL(`/users/${USERNAME}`, API_ORIGIN);
      const [profilePayload, repos, contributions] = await Promise.all([
        githubJson(profileUrl),
        getPublicRepositories(),
        getContributions(),
      ]);

      if (!isGithubApiProfile(profilePayload)) {
        throw new Error("GitHub returned an invalid profile response.");
      }

      const languages: Record<string, number> = {};
      for (const repo of repos) {
        if (repo.language) languages[repo.language] = (languages[repo.language] ?? 0) + 1;
      }

      return {
        status: "success",
        profile: {
          login: profilePayload.login,
          name: profilePayload.name,
          avatarUrl: profilePayload.avatar_url,
          bio: profilePayload.bio,
          followers: profilePayload.followers,
          following: profilePayload.following,
          publicRepos: profilePayload.public_repos,
          htmlUrl: profilePayload.html_url,
          location: profilePayload.location,
          company: profilePayload.company,
          createdAt: profilePayload.created_at,
        },
        repos,
        languages,
        totalStars: repos.reduce((total, repo) => total + repo.stars, 0),
        contributions,
      };
    } catch (error: unknown) {
      return {
        status: "error",
        error: error instanceof Error ? error.message : "GitHub data could not be loaded.",
      };
    }
  },
);
