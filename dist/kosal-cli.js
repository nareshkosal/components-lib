#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const NPM_SCOPE = '@nareshkosal';
const COMPONENTS = ['split-display', 'workos-authkit', 'workos-init-script'];

function showUsage() {
  console.log(`
🎨 Kosal Components CLI

Usage:
  npx ${NPM_SCOPE}/scad-components install <component-name>
  npx ${NPM_SCOPE}/scad-components list
  npx ${NPM_SCOPE}/scad-components help

Available Components:
  ${COMPONENTS.map(name => `• ${name}`).join('\n  ')}

Examples:
  npx ${NPM_SCOPE}/scad-components install workos-authkit
  npx ${NPM_SCOPE}/scad-components install split-display
`);
}

function listComponents() {
  console.log('\n📦 Available Components:\n');
  COMPONENTS.forEach(name => {
    console.log(`  • ${name}`);
  });
  console.log(`\nInstall with: npx ${NPM_SCOPE}/scad-components install <component-name>\n`);
}

function installComponent(componentName) {
  if (!COMPONENTS.includes(componentName)) {
    console.error(`❌ Component "${componentName}" not found.`);
    console.log(`Available components: ${COMPONENTS.join(', ')}`);
    process.exit(1);
  }

  console.log(`\n📥 Installing ${NPM_SCOPE}/${componentName}...\n`);

  try {
    // Step 1: Install the npm package
    console.log('📦 Installing npm package...');
    execSync(`npm install ${NPM_SCOPE}/${componentName}`, { stdio: 'inherit' });
    
    // Step 2: Get the installed package path
    const packagePath = path.join(process.cwd(), 'node_modules', NPM_SCOPE, componentName);
    
    if (!fs.existsSync(packagePath)) {
      console.error(`❌ Package not found at ${packagePath}`);
      process.exit(1);
    }

    // Step 3: Read the registry item to get file mappings
    const registryPath = path.join(packagePath, 'index.json');
    if (!fs.existsSync(registryPath)) {
      console.error(`❌ Registry file not found at ${registryPath}`);
      process.exit(1);
    }

    const registryItem = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    
    if (!registryItem.files || !Array.isArray(registryItem.files)) {
      console.error(`❌ No files defined in registry item`);
      process.exit(1);
    }

    console.log(`📁 Copying ${registryItem.files.length} files to your project...`);

    // Step 4: Copy each file to the target location
    let copiedCount = 0;
    registryItem.files.forEach(file => {
      if (!file.path || !file.target) {
        console.warn(`⚠️  Skipping file - missing path or target`);
        return;
      }

      const sourcePath = path.join(packagePath, file.path);
      const targetPath = path.join(process.cwd(), file.target);

      // Create target directory if it doesn't exist
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Copy the file
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copied ${file.target}`);
        copiedCount++;
      } else {
        console.warn(`⚠️  Source file not found: ${sourcePath}`);
      }
    });

    // Step 5: Install dependencies
    if (registryItem.dependencies && registryItem.dependencies.length > 0) {
      console.log('\n📦 Installing component dependencies...');
      execSync(`npm install ${registryItem.dependencies.join(' ')}`, { stdio: 'inherit' });
    }

    console.log(`\n🎉 Successfully installed ${componentName}!`);
    console.log('\nFiles added to your project:');
    registryItem.files.forEach(file => {
      if (file.target) {
        console.log(`  📄 ${file.target}`);
      }
    });
    console.log('\nNext steps:');
    console.log('1. Configure your environment variables if needed');
    console.log('2. Import and use the components in your code');
    console.log('3. Run your development server to test');

  } catch (error) {
    console.error(`❌ Installation failed:`, error.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    showUsage();
    return;
  }
  
  if (args[0] === 'list' || args[0] === 'ls') {
    listComponents();
    return;
  }
  
  if (args[0] === 'install' && args[1]) {
    installComponent(args[1]);
    return;
  }
  
  if (COMPONENTS.includes(args[0])) {
    // Support direct component name for backward compatibility
    installComponent(args[0]);
    return;
  }
  
  console.error(`❌ Unknown command: ${args[0]}`);
  showUsage();
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { installComponent, COMPONENTS };