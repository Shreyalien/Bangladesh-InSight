const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Packaging project zip...');
const sourceDir = 'C:\\Users\\RimasumIT\\.gemini\\antigravity\\scratch\\amar-desh-360';
const targetZip1 = 'C:\\Users\\RimasumIT\\.gemini\\antigravity\\scratch\\AmarDesh360_Project.zip';
const targetZip2 = 'C:\\Users\\RimasumIT\\Downloads\\AmarDesh360_Project.zip';

// Temporary directory for clean zip
const tempZipDir = 'C:\\Users\\RimasumIT\\.gemini\\antigravity\\scratch\\temp_zip_stage\\amar-desh-360';

if (fs.existsSync('C:\\Users\\RimasumIT\\.gemini\\antigravity\\scratch\\temp_zip_stage')) {
  fs.rmSync('C:\\Users\\RimasumIT\\.gemini\\antigravity\\scratch\\temp_zip_stage', { recursive: true, force: true });
}

fs.mkdirSync(tempZipDir, { recursive: true });

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (path.basename(src) === 'node_modules' || path.basename(src) === '.git' || path.basename(src) === 'temp_zip_stage') {
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Staging files...');
copyRecursiveSync(sourceDir, tempZipDir);

console.log('Compressing staged files...');
const psScript = `
if (Test-Path '${targetZip1}') { Remove-Item '${targetZip1}' -Force }
Compress-Archive -Path 'C:\\Users\\RimasumIT\\.gemini\\antigravity\\scratch\\temp_zip_stage\\amar-desh-360' -DestinationPath '${targetZip1}' -CompressionLevel Optimal
Copy-Item '${targetZip1}' -Destination '${targetZip2}' -Force
Remove-Item 'C:\\Users\\RimasumIT\\.gemini\\antigravity\\scratch\\temp_zip_stage' -Recurse -Force
`;

fs.writeFileSync('compress.ps1', psScript, 'utf8');
execSync('powershell -ExecutionPolicy Bypass -File compress.ps1', { stdio: 'inherit' });
if (fs.existsSync('compress.ps1')) fs.unlinkSync('compress.ps1');

console.log('Successfully created AmarDesh360_Project.zip at both locations:');
console.log('1. ' + targetZip1);
console.log('2. ' + targetZip2);
