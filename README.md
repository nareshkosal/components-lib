# Kosal Components - NPM Registry

A collection of reusable React components built with [shadcn/ui](https://ui.shadcn.com) registry system, published to NPM under the `@kosal` scope.

## 🎨 Available Components

### Split Display
Interactive WebGL video panels built with react-three-fiber.
- **Install**: `npx shadcn@latest add @kosal/split-display`
- **NPM**: `npm install @kosal/split-display`
- **Dependencies**: `three`, `@react-three/fiber`, `@react-three/drei`
- **Features**: 3D video panels, mouse interaction, custom shaders

### WorkOS AuthKit
Next.js authentication scaffolding with WorkOS AuthKit integration.
- **Install**: `npx shadcn@latest add @kosal/workos-authkit`
- **NPM**: `npm install @kosal/workos-authkit`
- **Dependencies**: `@workos-inc/authkit-nextjs`
- **Features**: Authentication routes, middleware, user context

### WorkOS Init Script
CLI tool for scaffolding WorkOS AuthKit files.
- **Install**: `npx shadcn@latest add @kosal/workos-init-script`
- **NPM**: `npm install @kosal/workos-init-script`

## 🚀 Installation Methods

### Method 1: shadcn CLI (Recommended)
```bash
# Install Split Display component
npx shadcn@latest add @kosal/split-display

# Install WorkOS AuthKit
npx shadcn@latest add @kosal/workos-authkit
```

### Method 2: NPM Install
```bash
# Install individual components
npm install @kosal/split-display
npm install @kosal/workos-authkit

# Or install all components
npm install @kosal/scad-components
```

### Method 3: CLI Tool
```bash
# Install using the CLI tool
npx @kosal/scad-components split-display
npx @kosal/scad-components workos-authkit
npx @kosal/scad-components list  # See available components
```

## 📦 Package Structure

```
@kosal/
├── scad-components/          # Main package with all components
├── split-display/            # Individual Split Display component
├── workos-authkit/           # Individual WorkOS AuthKit component
└── workos-init-script/       # Individual WorkOS CLI tool
```

## 🔧 Development

### For Contributors
1. **Clone the repository**:
   ```bash
   git clone https://github.com/nareshkosal/components-lib.git
   cd components-lib
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Build components**:
   ```bash
   pnpm registry:build
   ```

4. **Build NPM packages**:
   ```bash
   pnpm build:npm
   ```

5. **Test packages**:
   ```bash
   pnpm test:packages
   ```

6. **Publish to NPM**:
   ```bash
   pnpm publish:all
   ```

## 📁 Repository Structure

```
components-lib/
├── app/                      # Next.js app directory
├── components/               # Shared components
├── lib/                      # Utility functions
├── public/r/                 # Built registry files
├── registry/                 # Component source files
├── scripts/                  # Build and CLI scripts
├── dist/                     # NPM package build output
└── .github/workflows/        # CI/CD workflows
```

## 🌐 Registry URLs

Since the repository is private, GitHub Pages won't work. Instead, use these NPM-based installation methods:

- **Main Registry**: Install via `@kosal/scad-components`
- **Individual Components**: Install via `@kosal/[component-name]`
- **CLI Tool**: Use `npx @kosal/scad-components`

## 📝 Publishing Process

1. **Build Components**: `pnpm registry:build`
2. **Build NPM Packages**: `pnpm build:npm`
3. **Test Packages**: `pnpm test:packages`
4. **Publish**: `pnpm publish:all`

See [NPM_PUBLISHING_GUIDE.md](NPM_PUBLISHING_GUIDE.md) for detailed publishing instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add amazing component'`)
4. Push to the branch (`git push origin feature/amazing-component`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the [shadcn/ui documentation](https://ui.shadcn.com)
- Use the CLI tool: `npx @kosal/scad-components help`

---

Built with ❤️ using [shadcn/ui](https://ui.shadcn.com)

**Note**: Since your repository is private, these components are only accessible via NPM installation, not through GitHub Pages.