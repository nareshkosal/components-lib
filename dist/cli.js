#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const component = process.argv[2];

if (!component) {
  console.log('Usage: npx @kosal/scad-components <component-name>');
  console.log('Available components:', ["split-display","workos-authkit","workos-init-script"].join(', '));
  process.exit(1);
}

if (!["split-display","workos-authkit","workos-init-script"].includes(component)) {
  console.error(`Component "${component}" not found. Available: `, ["split-display","workos-authkit","workos-init-script"].join(', '));
  process.exit(1);
}

console.log(`Installing @kosal/${component}...`);

try {
  execSync(`npx shadcn@latest add @kosal/${component}`, { stdio: 'inherit' });
  console.log(`✓ Successfully installed @kosal/${component}`);
} catch (error) {
  console.error('Installation failed:', error.message);
  process.exit(1);
}
