#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Final build script for NPM package distribution using @nareshkosal scope
 * This includes postinstall scripts for automatic file copying
 */

const COMPONENTS = [
  'split-display',
  'workos-authkit', 
  'workos-init-script'
];

const NPM_SCOPE = '@nareshkosal';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  const content = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dest, content);
  console.log(`✓ Copied ${src} → ${dest}`);
}

function createCLI() {
  return `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up ${NPM_SCOPE} component...');

try {
  // Get the current package path
  const packagePath = __dirname;
  const projectPath = process.cwd();
  
  // Read the registry item
  const registryPath = path.join(packagePath, 'index.json');
  
  if (!fs.existsSync(registryPath)) {
    console.log('ℹ️  No index.json found, skipping setup');
    return;
  }
  
  const registryItem = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  
  if (!registryItem.files || !Array.isArray(registryItem.files)) {
    console.log('ℹ️  No files to copy, setup complete');
    return;
  }
  
  console.log(\`📁 Copying \${registryItem.files.length} files to your project...\`);
  
  // Copy each file to the target location
  let copiedCount = 0;
  registryItem.files.forEach(file => {
    if (!file.path || !file.target) {
      console.warn(\`⚠️  Skipping file - missing path or target\`);
      return;
    }
    
    const sourcePath = path.join(packagePath, file.path);
    const targetPath = path.join(projectPath, file.target);
    
    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy the file if it exists
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(\`✅ Copied \${file.target}\`);
      copiedCount++;
    } else {
      console.warn(\`⚠️  Source file not found: \${sourcePath}\`);
    }
  });
  
  console.log(\`🎉 Successfully copied \${copiedCount} files!\`);
  console.log('\\n💡 Next steps:');
  console.log('1. Set up environment variables if needed');
  console.log('2. Import and use the components in your code');
  console.log('3. Run your development server to test');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}`;
}

function createPostInstallScript() {
  return `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// This script runs automatically after npm install
console.log('🚀 Setting up ${NPM_SCOPE} component...');

try {
  // Get the current package path (this script's directory)
  const packagePath = __dirname;
  
  // Determine the project root correctly
  let projectPath;
  
  // Check if we're running from npm install (in node_modules)
  if (packagePath.includes('node_modules')) {
    // We're in node_modules/@nareshkosal/workos-authkit, go up 2 levels
    projectPath = path.resolve(packagePath, '..', '..');
  } else {
    // Fallback to process.cwd() for other scenarios
    projectPath = process.cwd();
  }
  
  // Read the registry item
  const registryPath = path.join(packagePath, 'index.json');
  
  if (!fs.existsSync(registryPath)) {
    console.log('ℹ️  No index.json found, skipping setup');
    return;
  }
  
  const registryItem = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  
  if (!registryItem.files || !Array.isArray(registryItem.files)) {
    console.log('ℹ️  No files to copy, setup complete');
    return;
  }
  
  console.log(\`📁 Copying \${registryItem.files.length} files to your project...\`);
  
  // Copy each file to the target location
  let copiedCount = 0;
  registryItem.files.forEach(file => {
    if (!file.path || !file.target) {
      console.warn(\`⚠️  Skipping file - missing path or target\`);
      return;
    }
    
    const sourcePath = path.join(packagePath, file.path);
    const targetPath = path.join(projectPath, file.target);
    
    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy the file if it exists
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(\`✅ Copied \${file.target}\`);
      copiedCount++;
    } else {
      console.warn(\`⚠️  Source file not found: \${sourcePath}\`);
    }
  });
  
  console.log(\`🎉 Successfully copied \${copiedCount} files!\`);
  console.log('\\n💡 Next steps:');
  console.log('1. Set up environment variables if needed');
  console.log('2. Import and use the components in your code');
  console.log('3. Run your development server to test');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  // Don't exit with error to avoid breaking npm install
}`;
}

function createComponentPackage(componentName) {
  const srcPath = `public/r/${componentName}.json`;
  const destPath = `dist/${componentName}/package.json`;
  
  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠ Component ${componentName} not found in public/r/`);
    return;
  }
  
  // Read the component registry file
  const componentData = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  
  // Collect all files that need to be included
  const filesToInclude = ['index.json', 'postinstall.js', 'README.md'];
  const fileMappings = [];
  
  if (componentData.files && Array.isArray(componentData.files)) {
    componentData.files.forEach(file => {
      if (file.path && file.target) {
        filesToInclude.push(file.path);
        fileMappings.push({
          source: file.path,
          target: file.target,
          type: file.type || 'registry:component'
        });
      }
    });
  }
  
  // Create package.json for individual component
  const packageJson = {
    name: `${NPM_SCOPE}/${componentName}`,
    version: '1.0.7',
    description: componentData.description || `${NPM_SCOPE} ${componentName} component`,
    main: 'index.json',
    files: filesToInclude,
    keywords: ['shadcn', 'component', 'react', componentName, 'kosal'],
    author: 'kosal',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'https://github.com/nareshkosal/components-lib.git'
    },
    publishConfig: {
      access: 'public'
    },
    scripts: {
      postinstall: 'node postinstall.js'
    },
    bin: {
      [componentName]: './cli.js'
    },
    dependencies: componentData.dependencies ? Object.fromEntries(
      componentData.dependencies.map(dep => {
        // Use appropriate versions for each dependency
        const versions = {
          'three': '^0.158.0',
          '@react-three/fiber': '^8.15.12',
          '@react-three/drei': '^9.92.7',
          '@workos-inc/authkit-nextjs': '^2.10.0'
        };
        return [dep, versions[dep] || '^1.0.0'];
      })
    ) : {},
    shadcn: {
      name: componentName,
      type: componentData.type,
      dependencies: componentData.dependencies || [],
      registryDependencies: componentData.registryDependencies || []
    }
  };
  
  ensureDir(`dist/${componentName}`);
  fs.writeFileSync(destPath, JSON.stringify(packageJson, null, 2));
  
  // Copy the component data as index.json
  copyFile(srcPath, `dist/${componentName}/index.json`);
  
  // Copy all the actual component files
  fileMappings.forEach(mapping => {
    const sourcePath = mapping.source;
    const destFilePath = `dist/${componentName}/${sourcePath}`;
    
    // Create directory structure for the file
    const destDir = path.dirname(destFilePath);
    ensureDir(destDir);
    
    // Copy the file if it exists
    const fullSourcePath = path.join(__dirname, '..', sourcePath);
    if (fs.existsSync(fullSourcePath)) {
      copyFile(fullSourcePath, destFilePath);
    } else {
      console.warn(`⚠️  Source file not found: ${fullSourcePath}`);
    }
  });
  
  // Create and copy the postinstall script
  const postInstallContent = createPostInstallScript();
  fs.writeFileSync(`dist/${componentName}/postinstall.js`, postInstallContent);
  fs.chmodSync(`dist/${componentName}/postinstall.js`, '755');
  
  // Create and copy the CLI script
  const cliContent = createCLI();
  fs.writeFileSync(`dist/${componentName}/cli.js`, cliContent);
  fs.chmodSync(`dist/${componentName}/cli.js`, '755');
  
  // Copy README.md to the package
  const rootReadmePath = path.join(__dirname, '..', 'README.md');
  const packageReadmePath = `dist/${componentName}/README.md`;
  
  if (fs.existsSync(rootReadmePath)) {
    // Create a package-specific README
    const rootReadme = fs.readFileSync(rootReadmePath, 'utf8');
    const packageReadme = `# ${NPM_SCOPE}/${componentName}

${componentData.description || `${NPM_SCOPE} ${componentName} component`}

## Installation

\`\`\`bash
# Using npm
npx ${NPM_SCOPE}/${componentName}

# Using pnpm
pnpm dlx ${NPM_SCOPE}/${componentName}

# Using yarn
yarn dlx ${NPM_SCOPE}/${componentName}
\`\`\`

## Features

- ⚡ One-command installation
- 📦 Automatic dependency management
- 🎯 TypeScript ready
- 🔧 Multiple package managers supported
- 🎨 Modern React patterns
- 📱 Responsive design

## Documentation

For complete documentation, examples, and troubleshooting, visit the [main repository](https://github.com/nareshkosal/components-lib).

---

**Part of the ${NPM_SCOPE} component collection**`;
    
    fs.writeFileSync(packageReadmePath, packageReadme);
    console.log(`✓ Created README.md for ${NPM_SCOPE}/${componentName}`);
  } else {
    console.warn(`⚠️  Root README.md not found, skipping README creation`);
  }
  
  console.log(`✓ Created package for ${NPM_SCOPE}/${componentName}`);
}

function createMainPackage() {
  const mainPackage = {
    name: `${NPM_SCOPE}/scad-components`,
    version: '1.0.6',
    description: 'A collection of reusable React components built with shadcn/ui registry system',
    main: 'registry.json',
    files: ['registry.json', 'kosal-cli.js'],
    keywords: ['shadcn', 'components', 'react', 'registry', 'kosal'],
    author: 'kosal',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'https://github.com/nareshkosal/components-lib.git'
    },
    publishConfig: {
      access: 'public'
    },
    bin: {
      'kosal-components': 'kosal-cli.js',
      'kosal': 'kosal-cli.js'
    }
  };
  
  ensureDir('dist');
  fs.writeFileSync('dist/package.json', JSON.stringify(mainPackage, null, 2));
  
  // Copy main registry
  copyFile('public/r/registry.json', 'dist/registry.json');
  
  // Copy the CLI tool
  const cliSource = path.join(__dirname, '..', 'kosal-cli.js');
  copyFile(cliSource, 'dist/kosal-cli.js');
  fs.chmodSync('dist/kosal-cli.js', '755');
  
  console.log(`✓ Created main package ${NPM_SCOPE}/scad-components`);
}

// Main build process
console.log(`🏗️  Building NPM packages for ${NPM_SCOPE} scope with postinstall scripts...\n`);

// Clean dist directory
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
ensureDir('dist');

// Create main package
createMainPackage();

// Create individual component packages
COMPONENTS.forEach(createComponentPackage);

console.log('\n🎉 NPM packages built successfully with automatic file copying!');
console.log(`\n📦 Packages ready for publishing under ${NPM_SCOPE} scope:`);
console.log(`- ${NPM_SCOPE}/scad-components`);
COMPONENTS.forEach(name => {
  console.log(`- ${NPM_SCOPE}/${name}`);
});
console.log('\n🚀 Next steps:');
console.log('1. cd dist');
console.log(`2. npm publish (for main package)`);
console.log(`3. cd [component-name] && npm publish (for individual components)`);
console.log('\n💡 Installation will now automatically copy files to user projects!');