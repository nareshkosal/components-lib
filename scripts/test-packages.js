#!/usr/bin/env node

/**
 * Test script to verify NPM packages work correctly
 */

const fs = require('fs');
const path = require('path');

function testPackage(packageName, packagePath) {
  console.log(`\n🧪 Testing ${packageName}...`);
  
  try {
    // Check if package.json exists
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found');
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    console.log(`✅ package.json valid`);
    
    // Check if main file exists
    const mainFile = packageJson.main || 'index.json';
    const mainFilePath = path.join(packagePath, mainFile);
    if (!fs.existsSync(mainFilePath)) {
      throw new Error(`Main file ${mainFile} not found`);
    }
    
    console.log(`✅ Main file exists: ${mainFile}`);
    
    // Test if it's valid JSON (for registry files)
    if (mainFile.endsWith('.json')) {
      const content = JSON.parse(fs.readFileSync(mainFilePath, 'utf8'));
      console.log(`✅ Registry file is valid JSON`);
      
      // Check required fields for registry files
      if (packageName === '@kosal/scad-components') {
        // Main registry should have items
        if (!content.items) throw new Error('Missing items field in main registry');
        console.log(`✅ Main registry has ${content.items.length} items`);
      } else {
        // Individual components should have name and files
        if (!content.name) throw new Error('Missing name field');
        if (!content.files) throw new Error('Missing files field');
        console.log(`✅ Required registry fields present`);
      }
    }
    
    console.log(`✅ ${packageName} test passed!`);
    return true;
    
  } catch (error) {
    console.error(`❌ ${packageName} test failed:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Testing NPM packages...\n');
  
  const packages = [
    { name: '@kosal/scad-components', path: 'dist' },
    { name: '@kosal/split-display', path: 'dist/split-display' },
    { name: '@kosal/workos-authkit', path: 'dist/workos-authkit' },
    { name: '@kosal/workos-init-script', path: 'dist/workos-init-script' }
  ];
  
  let allPassed = true;
  
  packages.forEach(pkg => {
    const passed = testPackage(pkg.name, pkg.path);
    if (!passed) allPassed = false;
  });
  
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('✅ All packages tested successfully!');
    console.log('\n📝 Packages are ready for publishing.');
    console.log('Run: pnpm publish:all');
  } else {
    console.log('❌ Some packages failed tests.');
    console.log('Please fix the issues before publishing.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}