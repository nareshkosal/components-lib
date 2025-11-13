#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const AVAILABLE_COMPONENTS = [
  'split-display',
  'workos-authkit',
  'workos-init-script'
];

function showHelp() {
  console.log(`
🎨 Kosal Components CLI

Usage:
  npx @kosal/scad-components <component-name>
  npx @kosal/scad-components list
  npx @kosal/scad-components help

Available Components:
  ${AVAILABLE_COMPONENTS.map(name => `• ${name}`).join('\n  ')}

Examples:
  npx @kosal/scad-components split-display
  npx @kosal/scad-components workos-authkit
`);
}

function listComponents() {
  console.log('\n📦 Available Components:\n');
  AVAILABLE_COMPONENTS.forEach(name => {
    console.log(`  • ${name}`);
  });
  console.log('\nInstall with: npx @kosal/scad-components <component-name>\n');
}

function installComponent(componentName) {
  if (!AVAILABLE_COMPONENTS.includes(componentName)) {
    console.error(`❌ Component "${componentName}" not found.`);
    console.log(`Available components: ${AVAILABLE_COMPONENTS.join(', ')}`);
    process.exit(1);
  }

  console.log(`\n📥 Installing @kosal/${componentName}...\n`);

  try {
    // Use shadcn to install the component from the registry
    execSync(`npx shadcn@latest add @kosal/${componentName}`, { stdio: 'inherit' });
    console.log(`\n✅ Successfully installed @kosal/${componentName}`);
    
  } catch (error) {
    console.error(`❌ Installation failed:`, error.message);
    console.log(`\n💡 Make sure you have shadcn/ui initialized in your project.`);
    console.log(`   Run: npx shadcn@latest init`);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    return;
  }
  
  if (args[0] === 'list' || args[0] === 'ls') {
    listComponents();
    return;
  }
  
  const componentName = args[0];
  installComponent(componentName);
}

if (require.main === module) {
  main();
}

module.exports = { installComponent, AVAILABLE_COMPONENTS };