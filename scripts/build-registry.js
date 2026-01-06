#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the shadcn build command
console.log('Building registry...');
execSync('npx shadcn@latest build', { stdio: 'inherit' });

// Remove content properties from generated JSON files
const publicRDir = path.join(process.cwd(), 'public', 'r');

if (fs.existsSync(publicRDir)) {
  const files = fs.readdirSync(publicRDir);
  
  files.forEach(file => {
    if (file.endsWith('.json') && file !== 'registry.json') {
      const filePath = path.join(publicRDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Remove content properties from files array
      if (content.files && Array.isArray(content.files)) {
        content.files = content.files.map(file => {
          const { content: _, ...rest } = file;
          return rest;
        });
        
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
        console.log(`Removed content properties from ${file}`);
      }
    }
  });
  
  console.log('Registry build complete!');
} else {
  console.warn('Warning: public/r directory not found');
}

