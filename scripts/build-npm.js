#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Build script for NPM package distribution
 * Creates proper entry points and metadata for each component
 */

const COMPONENTS = [
  'split-display',
  'workos-authkit', 
  'workos-init-script'
];

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

function createComponentPackage(componentName) {
  const srcPath = `public/r/${componentName}.json`;
  const destPath = `dist/${componentName}/package.json`;
  
  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠ Component ${componentName} not found in public/r/`);
    return;
  }
  
  // Read the component registry file
  const componentData = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  
  // Create package.json for individual component
  const packageJson = {
    name: `@kosal/${componentName}`,
    version: '1.0.0',
    description: componentData.description || `Kosal ${componentName} component`,
    main: 'index.json',
    files: ['index.json'],
    keywords: ['shadcn', 'component', 'react', componentName],
    author: 'kosal',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'https://github.com/nareshkosal/components-lib.git'
    },
    publishConfig: {
      access: 'public'
    },
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
  
  console.log(`✓ Created package for @kosal/${componentName}`);
}

function createMainPackage() {
  const mainPackage = {
    name: '@kosal/scad-components',
    version: '1.0.0',
    description: 'A collection of reusable React components built with shadcn/ui registry system',
    main: 'registry.json',
    files: ['registry.json', 'cli.js'],
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
      'kosal-components': 'cli.js',
      'kosal': 'cli.js'
    }
  };
  
  ensureDir('dist');
  fs.writeFileSync('dist/package.json', JSON.stringify(mainPackage, null, 2));
  
  // Copy main registry
  copyFile('public/r/registry.json', 'dist/registry.json');
  
  console.log('✓ Created main package @kosal/scad-components');
}

function createInstallationScript() {
  const script = `#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const component = process.argv[2];

if (!component) {
  console.log('Usage: npx @kosal/scad-components <component-name>');
  console.log('Available components:', ${JSON.stringify(COMPONENTS)}.join(', '));
  process.exit(1);
}

if (!${JSON.stringify(COMPONENTS)}.includes(component)) {
  console.error(\`Component "\${component}" not found. Available: \`, ${JSON.stringify(COMPONENTS)}.join(', '));
  process.exit(1);
}

console.log(\`Installing @kosal/\${component}...\`);

try {
  execSync(\`npx shadcn@latest add @kosal/\${component}\`, { stdio: 'inherit' });
  console.log(\`✓ Successfully installed @kosal/\${component}\`);
} catch (error) {
  console.error('Installation failed:', error.message);
  process.exit(1);
}
`;

  fs.writeFileSync('dist/cli.js', script);
  fs.chmodSync('dist/cli.js', '755');
  
  console.log('✓ Created installation CLI script');
}

// Main build process
console.log('🏗️  Building NPM packages...\n');

// Clean dist directory
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
ensureDir('dist');

// Create main package
createMainPackage();

// Create individual component packages
COMPONENTS.forEach(createComponentPackage);

// Create installation CLI
createInstallationScript();

console.log('\n🎉 NPM packages built successfully!');
console.log('\nNext steps:');
console.log('1. cd dist');
console.log('2. npm publish (for main package)');
console.log('3. cd [component-name] && npm publish (for individual components)');