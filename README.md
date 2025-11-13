# 🚀 @nareshkosal Components

A collection of production-ready React components with seamless installation and automatic dependency management.

## ✨ Features

- ⚡ **One-command installation** - Install components and dependencies automatically
- 📦 **Auto-dependency management** - No manual dependency installation needed
- 🎯 **TypeScript ready** - Full TypeScript support with proper type definitions
- 🔧 **Multiple package managers** - Works with npm, pnpm, and yarn
- 🎨 **Modern design** - Built with latest React patterns and best practices
- 📱 **Responsive** - Mobile-first design approach

## 📦 Available Components

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| **workos-authkit** | Complete WorkOS authentication setup with routes, middleware, and UI components | `@workos-inc/authkit-nextjs` |
| **split-display** | Interactive 3D WebGL video panels with react-three-fiber | `three`, `@react-three/fiber`, `@react-three/drei` |

## 🚀 Quick Installation

### One-Command Installers (Recommended)

```bash
# WorkOS AuthKit - Complete authentication setup
npx @nareshkosal/install-workos-authkit

# Split Display - 3D WebGL video panels
npx @nareshkosal/install-split-display
```

### Direct Component Installation

```bash
# WorkOS AuthKit
npx @nareshkosal/workos-authkit

# Split Display
npx @nareshkosal/split-display
```

## 📋 Package Manager Support

### NPM
```bash
npx @nareshkosal/install-workos-authkit
# or
npx @nareshkosal/workos-authkit
```

### PNPM
```bash
pnpm dlx @nareshkosal/install-workos-authkit
# or
pnpm dlx @nareshkosal/workos-authkit
```

### Yarn
```bash
yarn dlx @nareshkosal/install-workos-authkit
# or
yarn dlx @nareshkosal/workos-authkit
```

## 🔧 What Gets Installed

### WorkOS AuthKit
- **Routes**: `app/login/route.ts`, `app/callback/route.ts`, `app/logout/route.ts`
- **Middleware**: `middleware.ts` with authentication
- **UI Components**: `components/header.tsx` with auth buttons
- **Context**: `contexts/UserContext.tsx` for auth state
- **Dependencies**: `@workos-inc/authkit-nextjs`

### Split Display
- **Main Component**: `components/split-display.tsx`
- **Sub-components**: `components/split-display/` (4 files)
- **Hooks**: `hooks/use-video-element.ts`
- **Utilities**: `lib/split-display/` (3 files)
- **Dependencies**: `three`, `@react-three/fiber`, `@react-three/drei`

## 🎯 Usage Examples

### WorkOS AuthKit

After installation, configure your environment variables:

```bash
# .env.local
WORKOS_CLIENT_ID=your_client_id
WORKOS_API_KEY=your_api_key
WORKOS_REDIRECT_URI=http://localhost:3000/callback
WORKOS_COOKIE_PASSWORD=your_secure_password_at_least_32_characters
```

Then use the Header component in your layout:

```tsx
// app/layout.tsx
import Header from '@/components/header'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
```

**Complete WorkOS Setup Example:**

```tsx
// app/protected/page.tsx
import { getUser } from '@/contexts/UserContext'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return (
    <div>
      <h1>Welcome {user.firstName}!</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
```

### Split Display

**Basic Usage:**

```tsx
// app/page.tsx
import { SplitDisplay } from '@/components/split-display'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SplitDisplay 
        videoUrl="/path/to/your/video.mp4"
        showDebug={false}
      />
    </main>
  )
}
```

**Advanced Configuration with Multiple Videos:**

```tsx
// app/video-showcase/page.tsx
import { SplitDisplay } from '@/components/split-display'

export default function VideoShowcase() {
  return (
    <div className="w-full h-screen">
      <SplitDisplay 
        videoUrl="/videos/demo-reel.mp4"
        showDebug={true}
        autoPlay={true}
        muted={true}
        loop={true}
        className="rounded-lg shadow-2xl"
      />
      
      {/* Multiple instances */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <SplitDisplay 
          videoUrl="/videos/intro.mp4"
          showDebug={false}
          className="h-64"
        />
        <SplitDisplay 
          videoUrl="/videos/outro.mp4"
          showDebug={false}
          className="h-64"
        />
      </div>
    </div>
  )
}
```

**With Custom Styling and Controls:**

```tsx
// components/VideoSection.tsx
import { SplitDisplay } from '@/components/split-display'
import { useState } from 'react'

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  
  return (
    <section className="relative">
      <SplitDisplay 
        videoUrl="/videos/hero.mp4"
        showDebug={false}
        className="w-full h-screen object-cover"
        style={{
          filter: 'brightness(0.8) contrast(1.2)'
        }}
      />
      
      <div className="absolute bottom-8 left-8 z-10">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </section>
  )
}
```

## 🛠️ Configuration

### TypeScript Path Aliases

Ensure your `tsconfig.json` has the path alias configured:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Next.js Configuration

For WorkOS AuthKit, ensure you have App Router enabled (default in Next.js 13+).

## 🔍 Troubleshooting

### TypeScript Errors After Installation

If you see TypeScript errors, restart your TypeScript server:

**VS Code:**
1. Press `Cmd/Ctrl + Shift + P`
2. Type "TypeScript: Restart TS Server"
3. Press Enter

**Or restart your IDE completely**

### Import Errors

If imports are not recognized:
1. Check that `tsconfig.json` has the `@/*` path alias
2. Restart your development server
3. Clear `.next` cache: `rm -rf .next`

### Dependency Installation Issues

If automatic dependency installation fails:

```bash
# Check what dependencies are needed
cat components/*/index.json | grep dependencies

# Install manually
npm install @workos-inc/authkit-nextjs
# or for split-display
npm install three @react-three/fiber @react-three/drei
```

## 📚 Advanced Usage

### Customizing Components

All components are fully customizable. Edit the copied files to match your design:

```tsx
// components/header.tsx - Customize auth UI
<header className="your-custom-classes">
  {/* Your custom header content */}
</header>
```

### Multiple Components

Install multiple components in the same project:

```bash
# Install both components
npx @nareshkosal/install-workos-authkit
npx @nareshkosal/install-split-display
```

## 🤝 Contributing

Found a bug or want to suggest a new component? Open an issue or submit a pull request!

## 📄 License

MIT License - feel free to use in your projects.

## 🔗 Links

- [NPM Packages](https://www.npmjs.com/org/nareshkosal)
- [GitHub Repository](https://github.com/nareshkosal/components-lib)
- [Documentation](https://nareshkosal.com)

---

**Happy coding!** 🚀