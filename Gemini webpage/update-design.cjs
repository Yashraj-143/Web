const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Change color scheme
      content = content.replace(/indigo/g, 'emerald');
      
      // Change border radius for a different feel (Option B)
      content = content.replace(/rounded-3xl/g, 'rounded-none');
      content = content.replace(/rounded-2xl/g, 'rounded-sm');
      content = content.replace(/rounded-xl/g, 'rounded-sm');
      content = content.replace(/rounded-lg/g, 'rounded-none');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./src');
console.log('Design updated to Option B (Emerald & Sharp edges)');
