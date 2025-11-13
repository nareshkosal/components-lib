# NPM Publishing Guide for @kosal Components

## 🚀 Quick Start

Your components are ready to be published to NPM! Here's how to publish them:

### Prerequisites
1. **NPM Account**: Make sure you have an NPM account
2. **Login to NPM**: Run `npm login` in your terminal
3. **Verify Scope**: Ensure you can publish under the `@kosal` scope

### 📦 Publishing Steps

#### Option 1: Publish All Components at Once
```bash
# Build and publish everything
pnpm build:npm
pnpm publish:all
```

#### Option 2: Publish Individual Components
```bash
# Build first
pnpm build:npm

# Publish main package
cd dist && npm publish

# Publish individual components
cd dist/split-display && npm publish
cd ../workos-authkit && npm publish  
cd ../workos-init-script && npm publish
```

## 📋 Available Packages

After publishing, users can install your components in several ways:

### 1. Install via shadcn CLI (Recommended)
```bash
# Install Split Display component
npx shadcn@latest add @kosal/split-display

# Install WorkOS AuthKit
npx shadcn@latest add @kosal/workos-authkit

# Install WorkOS Init Script
npx shadcn@latest add @kosal/workos-init-script
```

### 2. Install via NPM
```bash
# Install individual components
npm install @kosal/split-display
npm install @kosal/workos-authkit
npm install @kosal/workos-init-script

# Or install all components
npm install @kosal/scad-components
```

### 3. Use the CLI Tool
```bash
# Install using your custom CLI
npx @kosal/scad-components split-display
npx @kosal/scad-components workos-authkit
npx @kosal/scad-components list  # See available components
```

## 🔧 Package Details

### Main Package: `@kosal/scad-components`
- **Description**: Complete collection of all components
- **Main File**: `registry.json`
- **Includes**: All component registry files

### Individual Packages

#### `@kosal/split-display`
- **Description**: Interactive WebGL video panels built with react-three-fiber
- **Dependencies**: `three`, `@react-three/fiber`, `@react-three/drei`
- **Files**: Component source, hooks, utilities, materials

#### `@kosal/workos-authkit`
- **Description**: Next.js authentication scaffolding with WorkOS AuthKit
- **Dependencies**: `@workos-inc/authkit-nextjs`
- **Files**: Routes, middleware, context, components

#### `@kosal/workos-init-script`
- **Description**: CLI script to scaffold WorkOS AuthKit files
- **Files**: Installation script and templates

## 📝 Pre-Publishing Checklist

Before publishing, make sure:

- [ ] Components are built (`pnpm registry:build`)
- [ ] NPM packages are built (`pnpm build:npm`)
- [ ] Version numbers are updated if needed
- [ ] You're logged in to NPM (`npm login`)
- [ ] You have permission to publish under `@kosal` scope

## 🔄 Version Management

To update versions:

```bash
# Update main package version
npm version patch|minor|major

# Update individual component versions
cd dist/split-display && npm version patch
cd ../workos-authkit && npm version patch
cd ../workos-init-script && npm version patch
```

## 🆘 Troubleshooting

### Common Issues

1. **Scope Permission Error**
   ```
   npm ERR! You do not have permission to publish "@kosal/split-display"
   ```
   **Solution**: Make sure you're logged in with the correct NPM account that has access to the `@kosal` scope.

2. **Package Already Exists**
   ```
   npm ERR! You cannot publish over the previously published versions
   ```
   **Solution**: Update the version number before publishing.

3. **Build Errors**
   ```
   Error: Component not found in public/r/
   ```
   **Solution**: Run `pnpm registry:build` first to generate the registry files.

### Getting Help

- Check the [NPM documentation](https://docs.npmjs.com/)
- Open an issue on your GitHub repository
- Test locally before publishing

## 📊 Post-Publishing

After successful publishing:

1. **Test Installation**: Try installing your components from a different project
2. **Update Documentation**: Share the installation commands with users
3. **Monitor Usage**: Check NPM download statistics
4. **Maintain Components**: Keep components updated and fix any issues

## 🎯 Success!

Once published, users can install your components with:

```bash
# Any of these methods will work:
npx shadcn@latest add @kosal/split-display
npm install @kosal/split-display
npx @kosal/scad-components split-display
```

Happy publishing! 🎉