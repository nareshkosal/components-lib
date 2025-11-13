# 🚀 Installation Commands for @nareshkosal Components

## Quick One-Command Installers (Recommended)

These commands install the component and all its dependencies automatically:

### WorkOS AuthKit
```bash
npx @nareshkosal/install-workos-authkit
```

### Split Display (3D WebGL)
```bash
npx @nareshkosal/install-split-display
```

### Any Other Component
```bash
npx @nareshkosal/install-[component-name]
```

## Alternative Installation Methods

### Method 1: Direct NPM + CLI (if postinstall is blocked)
```bash
# Install the package
npm install @nareshkosal/workos-authkit

# Run the CLI to copy files
npx workos-authkit
```

### Method 2: Using kosal-cli (Manual)
```bash
# Install kosal-cli globally
npm install -g @nareshkosal/scad-components

# Install any component
kosal install workos-authkit
kosal install split-display
```

### Method 3: Traditional shadcn/ui way
```bash
# Add to your shadcn/ui project
npx shadcn@latest add https://nareshkosal.com/r/workos-authkit.json
```

## Package Manager Compatibility

### NPM
```bash
npx @nareshkosal/install-workos-authkit
```

### PNPM
```bash
pnpm dlx @nareshkosal/install-workos-authkit
```

### Yarn
```bash
yarn dlx @nareshkosal/install-workos-authkit
```

## Available Components

| Component | One-Command Install | Dependencies |
|-----------|---------------------|--------------|
| workos-authkit | `npx @nareshkosal/install-workos-authkit` | @workos-inc/authkit-nextjs |
| split-display | `npx @nareshkosal/install-split-display` | three, @react-three/fiber, @react-three/drei |

## What Each Installation Does

1. **Installs dependencies** - All required npm packages
2. **Copies component files** - Places files in correct project structure
3. **Sets up configuration** - Creates necessary config files
4. **Provides next steps** - Shows you how to use the component

## Troubleshooting

### If you see "permission denied" errors:
```bash
# Run with sudo (not recommended for production)
sudo npx @nareshkosal/install-workos-authkit

# Or fix npm permissions
npm config set unsafe-perm true
```

### If postinstall scripts are blocked:
```bash
# Use the CLI method instead
npm install @nareshkosal/workos-authkit && npx workos-authkit
```

### For corporate networks/firewalls:
```bash
# Use specific registry
npx @nareshkosal/install-workos-authkit --registry https://your-registry.com
```

## Verification

After installation, verify files were copied:
```bash
# Check workos-authkit files
ls -la app/login/ app/callback/ app/logout/ middleware.ts components/header.tsx contexts/UserContext.tsx

# Check split-display files  
ls -la components/split-display* hooks/use-video-element.ts lib/split-display/
```

## Next Steps After Installation

### WorkOS AuthKit

**1. Environment Setup:**
```bash
# .env.local
WORKOS_CLIENT_ID=your_client_id
WORKOS_API_KEY=your_api_key
WORKOS_REDIRECT_URI=http://localhost:3000/callback
WORKOS_COOKIE_PASSWORD=your_secure_password_at_least_32_characters
```

**2. Basic Usage:**
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

**3. Protected Routes:**
```tsx
// app/protected/page.tsx
import { getUser } from '@/contexts/UserContext'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const user = await getUser()
  if (!user) redirect('/login')
  return <div>Welcome {user.firstName}!</div>
}
```

### Split Display

**1. Basic Usage:**
```tsx
// app/page.tsx
import { SplitDisplay } from '@/components/split-display'

export default function Home() {
  return (
    <main className="min-h-screen">
      <SplitDisplay videoUrl="/videos/demo.mp4" showDebug={false} />
    </main>
  )
}
```

**2. Advanced Configuration:**
```tsx
// Multiple videos with custom styling
<div className="grid grid-cols-2 gap-4">
  <SplitDisplay 
    videoUrl="/videos/intro.mp4"
    showDebug={false}
    className="h-64 rounded-lg"
  />
  <SplitDisplay 
    videoUrl="/videos/outro.mp4"
    showDebug={true}
    className="h-64 rounded-lg"
  />
</div>
```

**3. Video Requirements:**
- Supported formats: MP4, WebM, OGG
- Recommended: 1080p or 720p for best performance
- File size: Optimize for web (under 50MB recommended)
- Hosting: Place videos in `/public/videos/` directory

---

**Need help?** All installations provide detailed next steps and error messages to guide you through the setup process.