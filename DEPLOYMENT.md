# Vercel Deployment Instructions

## Project Structure for Vercel

This project has been configured for Vercel deployment with the following structure:

```
/
├── client/                 # Frontend React application
│   ├── package.json       # Client dependencies
│   ├── vite.config.ts     # Vite configuration
│   ├── tailwind.config.ts # Tailwind configuration
│   ├── tsconfig.json      # TypeScript configuration
│   ├── index.html         # Entry HTML file
│   └── src/               # Source code
├── api/                   # Vercel serverless functions
│   └── email-signup.ts    # Email signup API endpoint
├── vercel.json           # Vercel deployment configuration
└── attached_assets/       # Static assets

```

## Dependencies

### Client Dependencies (client/package.json)
- React 18+ with TypeScript
- Vite for build system
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for components
- TanStack Query for data fetching
- Wouter for routing
- Zod for validation

### API Dependencies (root package.json)
- @vercel/node for serverless functions
- Zod for validation

## Build Configuration

### Vercel Configuration (vercel.json)
- **Build Command**: `cd client && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `cd client && npm install`
- **API Functions**: Located in `/api` folder
- **Routing**: SPA routing with API endpoints

### Vite Configuration (client/vite.config.ts)
- React plugin enabled
- Path aliases configured (@/ for src, @assets for assets)
- Build output to `dist` folder
- Development server on port 3000

## Deployment Steps

1. **Connect to Vercel**
   - Connect your repository to Vercel
   - Vercel will auto-detect the configuration

2. **Environment Variables** (if needed)
   - Set any required environment variables in Vercel dashboard
   - For email signup, you might want to configure external services

3. **Build Process**
   - Vercel will run `cd client && npm install`
   - Then `cd client && npm run build`
   - API functions will be deployed automatically

4. **Domain Configuration**
   - Configure custom domain in Vercel dashboard if needed
   - SSL certificates are automatically provided

## API Endpoints

### POST /api/email-signup
Handles email waitlist signup with the following:
- **Input**: JSON with `email` field
- **Validation**: Zod schema validation
- **Storage**: In-memory (consider database for production)
- **CORS**: Enabled for cross-origin requests
- **Response**: Success/error messages

## Local Development vs Production

### Local Development (Current Setup)
- Express server with full-stack setup
- File-based CSV storage
- Vite dev server with HMR

### Vercel Production
- Static frontend hosted on CDN
- Serverless API functions
- In-memory storage (temporary)
- Automatic HTTPS and global distribution

## Migration Notes

The project has been restructured to support both current local development and Vercel deployment:

1. **Client-side files** moved to proper structure in `/client`
2. **Server routes** converted to Vercel API functions in `/api`
3. **Build configurations** optimized for Vercel deployment
4. **Dependencies** separated between client and API requirements

## Post-Deployment Considerations

1. **Database Integration**: Replace in-memory storage with persistent database
2. **Email Service**: Integrate with email service provider for waitlist management
3. **Analytics**: Add analytics tracking for user interactions
4. **Monitoring**: Set up error monitoring and performance tracking
5. **CDN**: Optimize asset delivery and caching strategies

## Commands Summary

```bash
# Local development (current)
npm run dev

# Client development only
cd client && npm run dev

# Build for production
cd client && npm run build

# Deploy to Vercel
vercel deploy
```