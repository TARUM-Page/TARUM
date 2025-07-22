# Tarum.ai - Monochrome AI Landing Page

## Overview

This is a modern landing page application for Tarum.ai, an AI-powered creative platform. The project features a monochrome design with glassmorphic UI elements, built using React, TypeScript, and a full-stack Node.js architecture. The application includes email signup functionality for beta access and showcases various AI creative tools through an immersive landing page experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between frontend, backend, and shared components:

- **Frontend**: React-based single-page application with TypeScript
- **Backend**: Express.js server with TypeScript
- **Data Storage**: CSV file-based email storage
- **Styling**: Tailwind CSS with custom glassmorphic design system
- **Build System**: Vite for frontend bundling and development
- **UI Components**: Radix UI primitives with custom styling

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Component Library**: Custom UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth animations and scroll-triggered effects

### Backend Architecture
- **Express.js**: RESTful API server
- **TypeScript**: Full type safety across the application
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request logging for API endpoints
- **Memory Storage**: In-memory data storage for development (can be extended with database)

### Design System
- **Monochrome Theme**: Black, white, and grayscale color palette
- **Glassmorphism**: Translucent panels with backdrop-blur effects
- **Theme Toggle**: Dark/light mode switching capability
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Data Flow

### Email Signup Flow
1. User enters email in signup form
2. Frontend validates input and sends POST request to `/api/email-signup`
3. Backend validates email format using Zod schemas
4. Server checks for existing email to prevent duplicates
5. New signup is stored and confirmation is sent back
6. Frontend displays success/error toast notification
7. React Query invalidates related queries to update UI

### Component Rendering Flow
1. App component provides global context (Theme, Query Client, Tooltips)
2. Router handles navigation between pages
3. Home page renders sections with scroll-triggered animations
4. Each section uses Intersection Observer for performance
5. Glassmorphic components respond to hover states and theme changes

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across the application
- **Vite**: Build tool and development server

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library

### Database and Validation
- **Drizzle ORM**: Type-safe ORM for PostgreSQL
- **Neon Database**: PostgreSQL serverless database
- **Zod**: Schema validation library

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing tool
- **Autoprefixer**: CSS vendor prefixing

## Deployment Strategy

### Development Environment
- Vite development server with HMR (Hot Module Replacement)
- Express server with TypeScript compilation via tsx
- Environment variables for database configuration
- Replit-specific development tooling integration

### Production Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild compiles TypeScript server to `dist/index.js`
3. **Static Assets**: Frontend assets are served by Express in production
4. **Database Migration**: Drizzle handles schema migrations to PostgreSQL

### Production Deployment
- Single Node.js process serving both API and static files
- PostgreSQL database connection via environment variables
- Express serves built React application for client-side routing
- Error handling and logging for production monitoring

### Key Architectural Decisions

**Monorepo Structure**: Chose to keep frontend, backend, and shared code in a single repository for easier development and deployment on Replit platform.

**Drizzle ORM**: Selected over alternatives like Prisma for better TypeScript integration and lighter bundle size, with PostgreSQL as the target database.

**CSV File Storage**: Simple email storage system using local CSV files for waitlist signups, making deployment easier without requiring database setup.

**Glassmorphic Design**: Implemented custom CSS variables and Tailwind utilities to create the monochrome glassmorphic aesthetic specified in the design requirements.

**Component Architecture**: Used Radix UI as foundation for accessibility and customization, with custom styling to match the monochrome design system.

**Mobile-First Design**: Implemented responsive design with mobile navigation, improved grid layouts, and enhanced accessibility features.

## Recent Changes (January 2025)

**Vercel Deployment Preparation (January 22, 2025)**:
- Created complete Vercel deployment configuration with vercel.json
- Restructured project with client/ folder containing frontend package.json and build setup
- Converted server routes to Vercel API functions in /api directory
- Created email signup serverless function with CORS support and validation
- Added comprehensive deployment documentation in DEPLOYMENT.md
- Updated Vite configuration for standalone client deployment
- Fixed image asset references for improved build compatibility
- Added environment configuration for development vs production API endpoints

**UI/UX Improvements (January 22, 2025)**:
- Removed "Join Waitlist" button after "All-in-One AI Creative Suite" section as requested
- Changed features section background from white to very light grey in light mode
- Enhanced glassmorphic styling with subtle grey backgrounds (95% lightness)
- Added parallax scrolling effect to hero section for improved visual appeal
- Replaced problematic image imports with clean SVG placeholder graphics

**Migration to Replit (January 22, 2025)**:
- Successfully migrated project from Replit Agent to Replit environment
- Verified all packages installed and configured properly  
- Confirmed server running on port 5000 with proper Replit setup
- Validated Vite development environment working correctly
- Project structure follows Replit best practices

**Brand and Content Updates (January 22, 2025)**:
- Changed brand name from "Tarum.ai" to "TARUM" in hero banner and navigation
- Reordered page sections: moved "All-in-One AI Creative Suite" after hero
- Moved "Designed for the Future of Creation" after products section
- Removed "Meet Our Builders" team section completely
- Removed team navigation links from header menu

**Previous Updates**:
**Simplified Storage**: Replaced database with CSV file storage for easier deployment and simpler email collection.

**Design Improvements**: 
- Fixed theme provider TypeScript errors
- Restored AI artwork hero background image
- Added mobile navigation menu with hamburger icon
- Improved glassmorphic input styling with transparent backgrounds
- Enhanced mobile responsiveness across all sections
- Added proper SEO meta tags and Open Graph data
- Improved accessibility with better focus states and ARIA labels
- Added smooth scroll behavior and loading animations

**Content Updates**:
- Changed "Join Beta" to "Join Wishlist" throughout
- Updated contact email to admin@tarum.ai
- Changed location from San Francisco to Dubai, UAE
- Removed social media links and legal section
- Removed countdown timer from launch section
- Centered copyright section with proper styling

**Technical Fixes**:
- Fixed navigation overlay issues with proper backdrop blur
- Moved theme toggle to bottom right corner
- Enhanced mobile menu with glassmorphic styling
- Improved grid layouts for better mobile display
- Added loading states and error handling