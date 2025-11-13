#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// This script runs automatically after npm install
console.log('🚀 Setting up @nareshkosal component...');

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
  
  console.log(`📁 Copying ${registryItem.files.length} files to your project...`);
  
  // Copy each file to the target location
  let copiedCount = 0;
  registryItem.files.forEach(file => {
    if (!file.path || !file.target) {
      console.warn(`⚠️  Skipping file - missing path or target`);
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
      console.log(`✅ Copied ${file.target}`);
      copiedCount++;
    } else {
      console.warn(`⚠️  Source file not found: ${sourcePath}`);
    }
  });
  
  console.log(`🎉 Successfully copied ${copiedCount} files!`);
  console.log('\n💡 Next steps:');
  console.log('1. Set up environment variables if needed');
  console.log('2. Import and use the components in your code');
  console.log('3. Run your development server to test');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  // Don't exit with error to avoid breaking npm install
}