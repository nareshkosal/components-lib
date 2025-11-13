# Components Lib - SCAD CN Registry

A collection of reusable React components built with [shadcn/ui](https://ui.shadcn.com) registry system.

## 🎨 Available Components

### Split Display
Interactive WebGL video panels built with react-three-fiber.
- **Install**: `npx shadcn@latest add https://nareshkosal.github.io/components-lib/r/split-display.json`
- **Dependencies**: `three`, `@react-three/fiber`, `@react-three/drei`
- **Features**: 3D video panels, mouse interaction, custom shaders

### WorkOS AuthKit
Next.js authentication scaffolding with WorkOS AuthKit integration.
- **Install**: `npx shadcn@latest add https://nareshkosal.github.io/components-lib/r/workos-authkit.json`
- **Dependencies**: `@workos-inc/authkit-nextjs`
- **Features**: Authentication routes, middleware, user context

### WorkOS Init Script
CLI tool for scaffolding WorkOS AuthKit files.
- **Install**: `npx shadcn@latest add https://nareshkosal.github.io/components-lib/r/workos-init-script.json`

## 🚀 Quick Start

### For Users
Install any component using the shadcn CLI:

```bash
# Install Split Display component
npx shadcn@latest add https://nareshkosal.github.io/components-lib/r/split-display.json

# Install WorkOS AuthKit
npx shadcn@latest add https://nareshkosal.github.io/components-lib/r/workos-authkit.json
```

### For Developers
1. **Clone the repository**:
   ```bash
   git clone https://github.com/nareshkosal/components-lib.git
   cd components-lib
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run development server**:
   ```bash
   pnpm dev
   ```

4. **Build registry**:
   ```bash
   pnpm registry:build
   ```

## 📁 Project Structure

```
components-lib/
├── app/                    # Next.js app directory
├── components/             # Shared components
├── lib/                    # Utility functions
├── public/r/               # Built registry files (auto-generated)
├── registry/               # Component source files
│   └── new-york/
│       ├── blocks/         # Block components
│       └── ui/             # UI components
├── scripts/                # Build scripts
├── templates/              # Template files
└── .github/workflows/      # CI/CD workflows
```

## 🔧 Registry Development

### Adding New Components

1. **Create component files** in `registry/new-york/blocks/your-component/`
2. **Update `registry.json`** with your component configuration
3. **Build the registry**:
   ```bash
   pnpm registry:build
   ```

### Component Configuration

Each component in `registry.json` should include:
- `name`: Component identifier
- `type`: Component type (`registry:component`, `registry:page`, etc.)
- `title`: Display title
- `description`: Component description
- `dependencies`: NPM dependencies
- `files`: Array of component files

Example:
```json
{
  "name": "my-component",
  "type": "registry:component",
  "title": "My Component",
  "description": "A custom component",
  "dependencies": ["lucide-react"],
  "files": [
    {
      "path": "registry/new-york/blocks/my-component/my-component.tsx",
      "type": "registry:component"
    }
  ]
}
```

## 🌐 Deployment

This repository is automatically deployed to GitHub Pages using GitHub Actions. The registry files are accessible at:

- **Main registry**: `https://nareshkosal.github.io/components-lib/r/registry.json`
- **Individual components**: `https://nareshkosal.github.io/components-lib/r/[component-name].json`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

---

Built with ❤️ using [shadcn/ui](https://ui.shadcn.com)