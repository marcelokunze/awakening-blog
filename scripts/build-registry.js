#!/usr/bin/env node

const { execSync } = require('child_process');

// Run the shadcn build command
// This will generate registry files WITH content properties for direct installations
console.log('Building registry...');
execSync('npx shadcn@latest build', { stdio: 'inherit' });
console.log('Registry build complete!');
