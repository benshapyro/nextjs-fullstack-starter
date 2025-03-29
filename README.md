# Next.js Fullstack Starter

A modern, production-ready template for building full-stack web applications with Next.js 15, React 19, Tailwind CSS 4, and Supabase.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with Turbopack for lightning-fast development
- **UI Library**: [React 19](https://react.dev/) with Server Components and new hooks
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) for utility-first styling
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for beautifully designed components
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth animations
- **Backend**: [Supabase](https://supabase.com/) for database, authentication, and storage
- **Deployment**: [Vercel](https://vercel.com/) for seamless hosting and CI/CD
- **Testing**: Jest and React Testing Library for unit and integration tests
- **Code Quality**: ESLint, Prettier, Husky, and lint-staged for consistent code
- **Design System**: Custom design tokens and Storybook for component organization

## 📋 Using This Template

There are three ways to use this template:

### Option 1: Use the GitHub Template Feature

1. Click the "Use this template" button at the top of the repository
2. Choose "Create a new repository"
3. Enter your repository name and details
4. Clone your new repository to your local machine
5. Run the setup script to customize the project:
   ```bash
   npm run setup
   ```

### Option 2: Clone the Repository Directly

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-fullstack-starter.git my-project
   cd my-project
   ```
2. Remove the .git folder to start fresh:
   ```bash
   rm -rf .git
   ```
3. Initialize a new git repository:
   ```bash
   git init
   ```
4. Run the setup script to customize the project:
   ```bash
   npm run setup
   ```

### Option 3: Install and Use Globally (Recommended)

For frequent use, you can install the template globally on your system:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-fullstack-starter.git
   cd nextjs-fullstack-starter
   ```

2. Install the template globally:
   ```bash
   npm install -g .
   ```

3. Now you can create new projects from anywhere:
   ```bash
   create-nextjs-project my-new-project
   ```

4. The script will copy the template and offer to run the setup script for you.

The setup script will guide you through:
- Renaming the project
- Adding a description and author
- Setting up Supabase credentials
- Cleaning up example files
- Initializing a fresh git repository
- Installing dependencies

## 🏗️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier available)
- A Vercel account (optional, for deployment)

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-fullstack-starter.git my-project
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit .env.local to add your Supabase credentials.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start the Next.js development server with Turbopack enabled for ultra-fast reloads.

5. **Open your browser**
   Your app will be running at http://localhost:3000

## 📁 Project Structure
The project structure is organized as follows:

### Root Directories
- `.github/` - GitHub Actions workflows
- `.husky/` - Git hooks
- `.storybook/` - Storybook configuration
- `docs/` - Documentation
- `public/` - Static files
- `scripts/` - Helper scripts
- `tests/` - Test files

### Source Directory (`src/`)

#### App Router (`app/`)
- `api/` - API routes
- `(auth)/` - Authentication pages
- `dashboard/` - Dashboard pages

#### Components (`components/`)
- `ui/` - UI components (shadcn)
- `layout/` - Layout components
- `forms/` - Form components
- `shared/` - Shared components

#### Other Source Directories
- `design-system/` - Design system
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and clients
- `stories/` - Storybook stories
- `types/` - TypeScript type definitions

## 🛠️ Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run Jest tests
- `npm run storybook` - Start Storybook
- `npm run create:page` - Generate a new page
- `npm run create:component` - Generate a new component
- `npm run setup` - Run the project setup script

### Using Generator Scripts

This starter comes with helper scripts to quickly scaffold pages and components:

#### Creating a new page

```bash
# Create a new page at src/app/about/page.tsx
npm run create:page about

# Create a nested page at src/app/blog/posts/page.tsx
npm run create:page blog/posts
```

#### Creating a new component

```bash
# Create a new component with test file at src/components/shared/Button.tsx
npm run create:component Button
```

This will generate:
- `src/components/shared/Button.tsx` - The component file
- `src/components/shared/Button.test.tsx` - A test file for the component

## 🧰 Project Tools

### Frontend Tools

**Next.js 15**: The React framework for production.
- What it does: Handles routing, server-side rendering, and API routes
- Where it's configured: `next.config.ts`

**Turbopack**: Next.js's super fast bundler (dev mode only).
- What it does: Makes local development much faster
- How to use it: Enabled by default with `npm run dev`
- Where it's configured: `next.config.ts` under the experimental.turbo key

**React 19**: The library for web and native user interfaces.
- What it does: Powers the component-based UI architecture
- Where it's used: Throughout all components

**Tailwind CSS 4**: A utility-first CSS framework.
- What it does: Enables rapid UI development with utility classes
- Where it's configured: `tailwind.config.js`

**shadcn/ui**: Re-usable components built with Radix UI and Tailwind CSS.
- What it does: Provides ready-to-use UI components
- Where it's located: `src/components/ui`

### Backend Tools

**Supabase**: Open source Firebase alternative.
- What it does: Handles database, authentication, storage, and more
- Where it's configured: `src/lib/supabase.ts`

### Development Tools

**ESLint**: Code linter.
- What it does: Finds and fixes problems in your code
- Where it's configured: `.eslintrc.json`

**Prettier**: Code formatter.
- What it does: Ensures consistent code style
- Where it's configured: `.prettierrc.js`

**Jest**: JavaScript testing framework.
- What it does: Runs tests to ensure code quality
- Where it's configured: `jest.config.js`

**Husky & lint-staged**: Git hooks integration.
- What it does: Runs linters and tests before commits
- Where it's configured: `.husky` directory and `lint-staged.config.js`

## 🔒 Environment Variables

This project uses the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase project URL | Yes |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your Supabase anonymous key | Yes |

Add these to your `.env.local` file.

## 🧩 Adding Components

You can install shadcn/ui components with:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc.
```

## 📚 Documentation

Additional documentation can be found in the docs directory:

- Getting Started Guide
- Deployment Guide
- Contributing Guidelines