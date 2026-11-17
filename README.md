# Sabastine Dev Portfolio

Create a world-class premium Full-Stack Engineer portfolio website for Sabastine Aguluka Chibuike.

IMPORTANT:

My GitHub is already connected.

Do NOT generate fake projects, fake repositories, fake technologies, or placeholder content.

Instead:

Automatically scan my GitHub repositories

Analyze repository names

Read README files

Detect technologies used

Detect languages

Detect deployment links if available

Detect repository activity

Detect project screenshots/assets if available

Ignore duplicate, abandoned, tutorial, or test repositories

Prioritize production-quality projects

Build the portfolio around my REAL work and experience.

DESIGN REFERENCE:

Use the uploaded image as design inspiration.

Keep the overall aesthetic:

Dark futuristic atmosphere

Purple neon lighting

Space-inspired background

Floating technology elements

Premium glassmorphism

Strong visual hierarchy

Improve it significantly:

Cleaner layout

Better spacing

More modern typography

Better mobile responsiveness

More premium interactions

Better project presentation

Stronger recruiter-focused structure

STYLE DIRECTION:

Hybrid design:

Vercel-level professionalism

Apple-like spacing

Modern SaaS layout

Subtle futuristic touches

Theme:

Dark mode default

Optional light mode

Deep charcoal background

Purple accent glow

Soft gradients

Minimal visual noise

Typography:

Headings:
Space Grotesk

Body:
Inter

Animations:

Smooth fade-in animations

Scroll reveal effects

Hover micro-interactions

Scroll progress indicator

Slight card lift

Subtle floating elements

Smooth page transitions

Small cursor interactions

Soft glow animations

Avoid:

Heavy particles

Excessive movement

Laggy effects

Overcrowded sections

================================================

NAVIGATION

Sticky navbar with blur effect:

Left:

Logo:
Sabastine Dev

Center:

About

Skills

Projects

Experience

GitHub

Contact

Right:

GitHub icon

LinkedIn icon

Dark/light mode toggle

================================================

HERO SECTION

Left side:

Badge:

"Available for opportunities"

Headline:

"Full-Stack Engineer Building Modern Digital Experiences"

Description:

"I Upgrade and build scalable, responsive, and high-performance applications with modern technologies and focus on exceptional user experiences."

Buttons:

View Projects

Contact Me

GitHub Profile

Social links:

GitHub

LinkedIn

Email

Right side:

Use uploaded profile photo as hero image.

Add:

Soft purple glow behind image

Animated orbit effect

Floating technology badges automatically based on technologies most used on GitHub

Examples:

React

TypeScript

Next.js

Node.js

Laravel

TailwindCSS

Add floating terminal card:

const developer = {
name: "Sabastine",
role: "Full-Stack Engineer",
passion: "Building scalable web applications",
code: "Clean. Efficient. Impactful."
}

Add animated statistics pulled from GitHub:

Total repositories

Contributions

Technologies used

Projects completed

================================================

FEATURED PROJECTS

This section MUST use GitHub data automatically.

For each selected repository:

Display:

Project image

Repository title

Description

Technologies

Category

Last updated date

GitHub stars if available

Live demo if available

Buttons:

Live Demo

GitHub Repository

Case Study

Add filtering:

All

Frontend

Full Stack

APIs

Tools

Project interactions:

Hover lift effect

Slight image zoom

Smooth reveal animations

================================================

ABOUT

Create professional About section using real GitHub and portfolio information.

Include:

Development journey timeline

Professional summary

Strengths

Core values

================================================

SKILLS

Generate skills dynamically based on GitHub repositories.

Group:

Frontend

Backend

Databases

Tools

Deployment

Display:

Interactive cards

Technology icons

Modern visual design

================================================

GITHUB ACTIVITY

Use real GitHub information.

Display:

Contribution graph

Repository statistics

Recent repositories

Most used languages

Contribution streak

GitHub metrics

================================================

CONTACT

Title:

"Let's Build Something Great"

Include:

Contact form

Email

GitHub

LinkedIn

================================================

FINAL INSTRUCTIONS

Build a portfolio that feels like a premium product and not a portfolio template.

Prioritize:

Professionalism

Performance

Strong project presentation

Clean architecture

Responsive design

Recruiter appeal

Real GitHub data

The final result should feel comparable to a top modern software engineer portfolio.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/109bdb53-aaf1-4f9b-b436-44be97f1ec85).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deployment

Use npm as the authoritative package manager and commit `package-lock.json` with dependency changes.
The project builds with `npm run build` for Vercel using Nitro's Vercel preset; no environment
variables are required to render the portfolio. Set `GITHUB_TOKEN` in Vercel only if you want
authenticated GitHub API requests and real contribution-calendar data. Without it, public
repositories are fetched anonymously and contribution data is shown as unavailable. Never expose
this token through a `VITE_` variable. The Supabase variables in `.env.example` are not used by the
current portfolio routes.
