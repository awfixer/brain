# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start the Next.js development server
- `pnpm build` - Build the application for production
- `pnpm build:analyze` - Build with bundle analysis enabled
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint on all files and fix issues automatically
- `pnpm ci` - Clean install (removes .next, pnpm-lock.yaml, node_modules and reinstalls)

## Architecture Overview

This is a Next.js 16 personal portfolio website built with App Router, TypeScript, and Tailwind CSS. The site serves as a developer portfolio showcasing projects and blog posts.

### Key Technologies
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling with shadcn/ui components
- **MDX** for blog posts and project content
- **GrowthBook** for A/B testing and feature flags
- **Sentry** for error monitoring
- **PostHog** for analytics
- **Vercel** for deployment

### Project Structure
- `app/` - Next.js App Router directory
  - `blog/` - Blog posts with MDX content in `posts/` subdirectory
  - `projects/` - Project showcases with MDX content in `posts/` subdirectory
  - `components/` - React components organized by type:
    - `abtesting/` - GrowthBook feature flag components
    - `custom/` - Site-specific components
    - `standard/` - Core layout components
    - `ui-shadcn/` - shadcn/ui component library
- `lib/` - Utility functions and configurations
- `config/` - Application configuration files

### Content Management
- Blog posts and projects are stored as MDX files in their respective `posts/` directories
- Content includes frontmatter metadata for title, description, publishedAt, etc.
- Both support draft mode (controlled by `draft: true` in frontmatter)
- Projects can have additional metadata like status, tier, repo links

### Feature Flags & A/B Testing
- GrowthBook integration for feature flags and experiments
- Feature flags are type-safe via the `FeatureFlags` type in `lib/growthbook.ts`
- Use `useFeature()` or `useTypedFeature()` hooks in components

### Styling Conventions
- Uses Tailwind CSS with custom black theme (`bg-black text-white`)
- Geist Sans and Geist Mono fonts from Vercel
- Components follow shadcn/ui patterns and styling
- Responsive design with mobile-first approach

### Linting & Code Quality
- ESLint configured for TypeScript, JSON, Markdown, and CSS
- Supports Next.js specific rules and modern JavaScript features
- Husky pre-commit hooks with lint-staged for automatic formatting
- Configuration allows Tailwind CSS directives and Next.js patterns

### Environment & Deployment
- Configured for Vercel deployment with Sentry monitoring
- PostHog analytics with custom proxy routes for tracking
- Environment variables for GrowthBook, Sentry, and other services
- Standalone output mode for optimized deployment