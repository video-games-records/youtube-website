# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is a YouTube-like interface for displaying YouTube videos from the Video Games Records website (https://www.videogamesrecords.net/). The application provides a modern, responsive interface that mimics YouTube's layout and functionality while integrating with the Video Games Records API to showcase gaming content and player achievements.

## Development Commands

**Development server:**
```bash
npm run dev
```

**Build commands:**
```bash
npm run build                 # TypeScript compilation + production build
npm run build-staging         # Build for staging environment
npm run build-production      # Build for production environment
npm run build-only            # Vite build without TypeScript compilation
```

**Code quality:**
```bash
npm run type-check            # TypeScript type checking with vue-tsc
npm run lint                  # ESLint for .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts files
npm run format                # Prettier formatting for src/ directory
```

**PWA commands:**
```bash
npm run pwa:build             # Production PWA build
npm run pwa:preview           # Preview PWA with host access
npm run pwa:analyze           # Bundle analysis with vite-bundle-analyzer
npm run pwa:test              # PWA test server
npm run lighthouse            # Lighthouse performance audit
```

## Architecture Overview

### Feature-Based Architecture
The codebase follows a feature-based architecture with clear separation of concerns:

- **`src/features/`** - Self-contained feature modules (core video features, auth, language, pwa, theme)
- **`src/core/`** - Core infrastructure (router, i18n, stores, plugins)
- **`src/shared/`** - Shared components and utilities
- **`src/views/`** - Top-level page components

### Feature Module Structure
Each feature follows a consistent structure:
```
features/[feature]/
├── components/          # Feature-specific Vue components
├── composables/         # Vue composables for feature logic
├── i18n/               # Feature translations (8 languages)
├── services/           # API and business logic services
├── stores/             # Pinia state management
├── types/              # TypeScript type definitions
├── utils/              # Feature-specific utilities
└── views/              # Feature page components
```

### Core Video Features
The main video functionality includes:
- **Home page** with YouTube-like grid layout for video discovery
- **Video detail page** with player and related videos sidebar
- **Player profiles** with video galleries and statistics
- **Active channels** sidebar for navigation
- **Video Cards** with thumbnails, titles, and metadata

### Internationalization (i18n)
- **Multi-language support:** en, fr, es, it, ja, pt-br, zh-cn, de (8 languages)
- **Route-based locales:** URLs include language prefix (e.g., `/en/`, `/fr/`)
- **Auto-detection:** Browser language detection with localStorage persistence
- **Feature-level translations:** Each feature manages its own translation files
- **Modular translation structure:** Separate files for player, video, and home translations

### Authentication System
- **JWT-based authentication** with token refresh mechanism
- **Role-based access control** with auth directives and route guards
- **Auth store** (Pinia) manages user state and permissions
- **Route protection** via meta fields (`requiresAuth`, `guest`)

### PWA Implementation
- **Vite PWA plugin** with Workbox for service worker management
- **Auto-update strategy** with user prompts for new versions
- **Offline support** with runtime caching for fonts, images, and API calls
- **Install prompts** and native app-like behavior

### UI Component System
- **Reka UI** (headless components) + **TailwindCSS** for styling
- **Shared UI components** in `src/shared/components/ui/`
- **Custom media components** for YouTube, Twitch, and generic video players
- **Theme system** with dark/light mode support

### Build Configuration
- **Vite** as build tool with Vue 3 support
- **Manual chunk optimization** for vendor, UI, and editor libraries
- **TypeScript** with strict type checking
- **ESLint** with Vue and TypeScript rules, ignores UI component library

### State Management
- **Pinia** for centralized state management
- **Persisted state** plugin for localStorage persistence
- **Feature stores** co-located with their respective features

## Key Technical Details

### Router Configuration
- Nested routing with language parameter extraction
- Route guards for authentication and guest-only pages
- Dynamic locale switching with URL updates

### Media Players
- Embedded YouTube, Twitch, and generic video player components
- Configurable player options and responsive design
- YouTube video integration with Video Games Records API

### API Integration
- **Video Games Records API** integration for fetching videos, players, and game data
- **Hydra JSON-LD format** for API responses with pagination support
- **Player profiles** with country, team, and statistics
- **Active channels** filtering (players with 20+ videos)

### Development Environment
- Hot module replacement with Vite
- Development PWA support enabled
- TypeScript strict mode with comprehensive type checking

### Environment-Specific Builds
- **Staging** and **production** build modes with separate configurations
- Environment variables through `.env.*` files
- Optimized chunk splitting for better caching