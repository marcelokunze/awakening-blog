#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the shadcn build command
console.log('Building registry...');
execSync('npx shadcn@latest build', { stdio: 'inherit' });

// Post-process generated JSON files
const publicRDir = path.join(process.cwd(), 'public', 'r');
const registryJsonPath = path.join(publicRDir, 'registry.json');

if (fs.existsSync(publicRDir)) {
  // Read registry.json to get repository info
  let repositoryUrl = null;
  if (fs.existsSync(registryJsonPath)) {
    const registryContent = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
    repositoryUrl = registryContent.repository;
  }
  
  const files = fs.readdirSync(publicRDir);
  
  files.forEach(file => {
    if (file.endsWith('.json') && file !== 'registry.json') {
      const filePath = path.join(publicRDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let modified = false;
      
      // Add repository field if missing
      if (repositoryUrl && !content.repository) {
        content.repository = repositoryUrl;
        modified = true;
      }
      
      // Remove content properties from files array
      if (content.files && Array.isArray(content.files)) {
        let hasContent = false;
        content.files = content.files.map(file => {
          if (file.content) {
            hasContent = true;
            const { content: _, ...rest } = file;
            return rest;
          }
          return file;
        });
        
        if (hasContent) {
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
        console.log(`Updated ${file}`);
      }
    }
  });
  
  console.log('Registry build complete!');
} else {
  console.warn('Warning: public/r directory not found');
}
